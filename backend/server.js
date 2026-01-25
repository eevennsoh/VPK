// Initialize console early for startup debugging
console.log('[STARTUP] Server process starting...');
console.error('[STARTUP] Startup initiated', new Date().toISOString());

// Try to load .env.local if it exists, but don't fail if it doesn't
try {
    require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') });
    console.log('[STARTUP] .env.local loaded');
} catch (e) {
    console.log('[STARTUP] .env.local not found, using environment variables only');
}

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

console.log('[STARTUP] Dependencies loaded');

const app = express();
const port = process.env.PORT || 8080;
console.log(`[STARTUP] Port configured: ${port}`);

// Debug logging
const DEBUG = process.env.DEBUG === 'true';
function debugLog(section, message, data) {
    if (DEBUG) {
        console.log(`[DEBUG][${section}] ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
}

app.use(cors());
app.use(express.json());

console.log('[STARTUP] Middleware configured');

function getEnvVars() {
    return {
        AI_GATEWAY_URL: process.env.AI_GATEWAY_URL,
        AI_GATEWAY_USE_CASE_ID: process.env.AI_GATEWAY_USE_CASE_ID,
        AI_GATEWAY_CLOUD_ID: process.env.AI_GATEWAY_CLOUD_ID,
        AI_GATEWAY_USER_ID: process.env.AI_GATEWAY_USER_ID,
    };
}

async function getAuthToken() {
    debugLog('AUTH', 'Using ASAP authentication');
    return generateAsapToken();
}

function generateAsapToken() {
    try {
        let privateKey = process.env.ASAP_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error('ASAP_PRIVATE_KEY not found in environment');
        }

        // Handle different key formats
        // Replace literal \\n with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');

        // Ensure proper PEM format
        if (!privateKey.includes('-----BEGIN')) {
            // If it's base64 encoded, decode it
            try {
                privateKey = Buffer.from(privateKey, 'base64').toString('utf-8');
            } catch (e) {
                // Not base64, use as-is
            }
        }

        // ASAP config for AI Gateway - read from environment variables
        // These are set in .env.local from the user's generated .asap-config file
        const config = {
            issuer: process.env.ASAP_ISSUER || process.env.AI_GATEWAY_USE_CASE_ID,
            kid: process.env.ASAP_KID,
            expiry: 60
        };

        if (!config.issuer || !config.kid) {
            throw new Error('Missing ASAP configuration: ASAP_ISSUER and ASAP_KID must be set in .env.local');
        }

        const now = Math.floor(Date.now() / 1000);
        const payload = {
            iss: config.issuer,
            sub: config.issuer,
            aud: ['ai-gateway'],
            iat: now,
            exp: now + config.expiry,
            jti: `${config.issuer}-${now}-${Math.random().toString(36).substring(7)}`
        };

        const token = jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            keyid: config.kid
        });

        return token;
    } catch (error) {
        console.error('Failed to generate ASAP token:', error);
        console.error('Private key format check:', {
            hasKey: !!process.env.ASAP_PRIVATE_KEY,
            keyLength: process.env.ASAP_PRIVATE_KEY?.length,
            startsWithBegin: process.env.ASAP_PRIVATE_KEY?.startsWith('-----BEGIN')
        });
        throw new Error('Token generation failed: ' + error.message);
    }
}

let buildAIGatewayPayload;
try {
    // Try Docker path first (./rovo), then local dev path (../rovo)
    let config;
    try {
        config = require('./rovo/config');
        console.log('[STARTUP] config loaded from ./rovo (Docker path)');
    } catch (e1) {
        config = require('../rovo/config');
        console.log('[STARTUP] config loaded from ../rovo (local dev path)');
    }
    buildAIGatewayPayload = config.buildAIGatewayPayload;
    console.log('[STARTUP] rovo config loaded successfully');
} catch (e) {
    console.warn('[STARTUP] rovo config failed to load:', e.message);
    console.warn('[STARTUP] Using fallback functions - config did not load!');
    // Provide a fallback (OpenAI format)
    buildAIGatewayPayload = (message) => ({
        model: "gpt-4o",
        messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: message }
        ],
        stream: true,
        max_tokens: 2000
    });
}

app.post('/api/rovo-chat', async (req, res) => {
    try {
        const { message, conversationHistory, contextDescription, userName } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        debugLog('CHAT', 'Received chat request', { messageLength: message.length, contextDescription, userName });

        const ENV_VARS = getEnvVars();
        debugLog('CHAT', 'Environment variables loaded', {
            AI_GATEWAY_URL: ENV_VARS.AI_GATEWAY_URL ? 'SET' : 'MISSING',
            AI_GATEWAY_USE_CASE_ID: ENV_VARS.AI_GATEWAY_USE_CASE_ID,
            AI_GATEWAY_USER_ID: ENV_VARS.AI_GATEWAY_USER_ID
        });

        if (!ENV_VARS.AI_GATEWAY_URL) {
            console.error('Missing required environment variable: AI_GATEWAY_URL');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        let token;
        try {
            debugLog('CHAT', 'Starting authentication token generation');
            token = await getAuthToken();
            debugLog('CHAT', 'Successfully obtained auth token', { tokenLength: token.length });
        } catch (tokenError) {
            console.error('Token generation error:', tokenError);
            debugLog('CHAT', 'Token generation failed', { error: tokenError.message });
            return res.status(500).json({
                error: 'Authentication failed',
                details: tokenError.message
            });
        }

        // Use the AI Gateway URL directly as configured
        // Supports both OpenAI format and Bedrock format endpoints
        const aiGatewayUrl = ENV_VARS.AI_GATEWAY_URL;

        console.log('Using AI Gateway endpoint:', aiGatewayUrl);

        const aiPayload = buildAIGatewayPayload(message, conversationHistory, contextDescription, userName);

        const aiResponse = await fetch(aiGatewayUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
                'Authorization': `bearer ${token}`,
                'X-Atlassian-UseCaseId': ENV_VARS.AI_GATEWAY_USE_CASE_ID,
                'X-Atlassian-CloudId': ENV_VARS.AI_GATEWAY_CLOUD_ID,
                'X-Atlassian-UserId': ENV_VARS.AI_GATEWAY_USER_ID
            },
            body: JSON.stringify(aiPayload)
        });

        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error('AI Gateway error:', aiResponse.status, errorText.substring(0, 500));
            return res.status(500).json({
                error: 'Failed to get AI response',
                status: aiResponse.status
            });
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const reader = aiResponse.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';
        let widgetStarted = false;
        let widgetBuffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataContent = line.slice(6).trim();
                    if (dataContent === '[DONE]') continue;

                    try {
                        const data = JSON.parse(dataContent);

                        // Extract text from OpenAI streaming format
                        const textContent = data.choices?.[0]?.delta?.content;

                        if (textContent) {
                            accumulatedText += textContent;

                            if (!widgetStarted && accumulatedText.includes('WIDGET_DATA:')) {
                                widgetStarted = true;
                                const parts = accumulatedText.split('WIDGET_DATA:');
                                widgetBuffer = 'WIDGET_DATA:' + parts[1];
                                console.log('Widget detected - buffering widget data');
                            } else if (widgetStarted) {
                                widgetBuffer += textContent;
                            } else {
                                // Stream text before widget normally
                                res.write(`data: ${JSON.stringify({ text: textContent })}\n\n`);
                            }
                        }
                    } catch (e) {
                        // If not JSON or parsing fails, skip
                    }
                }
            }
        }

        // Stream widget data if detected
        if (widgetStarted) {
            res.write(`data: ${JSON.stringify({ text: widgetBuffer })}\n\n`);
        }

        res.write('data: [DONE]\n\n');
        res.end();

    } catch (error) {
        console.error('Rovo Chat API error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

app.post('/api/suggested-questions', async (req, res) => {
    try {
        const { message, conversationHistory, assistantResponse } = req.body;

        console.log('[SUGGESTIONS] Received request', {
            message: message?.substring(0, 50),
            assistantResponse: assistantResponse?.substring(0, 50),
            hasHistory: !!conversationHistory
        });

        if (!assistantResponse) {
            return res.status(400).json({ error: 'Assistant response is required' });
        }

        debugLog('SUGGESTIONS', 'Received suggestion request');

        const ENV_VARS = getEnvVars();

        if (!ENV_VARS.AI_GATEWAY_URL) {
            console.error('Missing required environment variable: AI_GATEWAY_URL');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        let token;
        try {
            token = await getAuthToken();
        } catch (tokenError) {
            console.error('Token generation error:', tokenError);
            return res.status(500).json({
                error: 'Authentication failed',
                details: tokenError.message
            });
        }

        // Use the AI Gateway URL directly as configured
        const aiGatewayUrl = ENV_VARS.AI_GATEWAY_URL;

        // Build a payload specifically for generating suggested questions
        const conversationContext = conversationHistory && conversationHistory.length > 0
            ? conversationHistory.map(msg =>
                `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\\n')
            : 'No previous conversation.';

        const promptText = `You are a helpful assistant. Based on this conversation, generate exactly 3 concise follow-up questions that the user might want to ask next.

Previous conversation:
${conversationContext}

User's last message: ${message}

Assistant's response: ${assistantResponse}

Generate 3 short follow-up questions (20-40 characters each). Return ONLY a JSON array of strings, nothing else.
Format: ["Question 1?", "Question 2?", "Question 3?"]`;

        const aiPayload = {
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: promptText
                }
            ],
            max_completion_tokens: 200,
            temperature: 0.7,
            stream: false
        };

        const aiResponse = await fetch(openaiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`,
                'X-Atlassian-UseCaseId': ENV_VARS.AI_GATEWAY_USE_CASE_ID,
                'X-Atlassian-CloudId': ENV_VARS.AI_GATEWAY_CLOUD_ID,
                'X-Atlassian-UserId': ENV_VARS.AI_GATEWAY_USER_ID
            },
            body: JSON.stringify(aiPayload)
        });

        if (!aiResponse.ok) {
            const errorText = await aiResponse.text();
            console.error('AI Gateway error:', aiResponse.status, errorText.substring(0, 500));
            return res.status(500).json({
                error: 'Failed to get AI response',
                status: aiResponse.status
            });
        }

        const result = await aiResponse.json();
        const suggestedText = result.choices?.[0]?.message?.content || '[]';

        console.log('[SUGGESTIONS] Raw AI response:', suggestedText);

        // Parse the JSON array
        try {
            const questions = JSON.parse(suggestedText);
            if (Array.isArray(questions) && questions.length > 0) {
                console.log('[SUGGESTIONS] Successfully generated questions:', questions);
                return res.status(200).json({ questions });
            } else {
                console.warn('[SUGGESTIONS] Invalid questions format:', questions);
                return res.status(200).json({ questions: [] });
            }
        } catch (parseError) {
            console.error('[SUGGESTIONS] Failed to parse questions:', parseError);
            return res.status(200).json({ questions: [] });
        }

    } catch (error) {
        console.error('Suggested questions API error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

app.get('/healthcheck', (req, res) => {
    console.log('Healthcheck requested by Micros');
    res.status(200).json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
    console.log('Health check requested');
    debugLog('HEALTH', 'Processing health check');

    const envVars = getEnvVars();
    const key = process.env.ASAP_PRIVATE_KEY;

    debugLog('HEALTH', 'Auth configuration', {
        hasAsapKey: !!key
    });

    const response = {
        status: 'OK',
        message: 'Backend server is working!',
        timestamp: new Date().toISOString(),
        authMethod: 'ASAP',
        debugMode: DEBUG,
        envCheck: {
            AI_GATEWAY_URL: envVars.AI_GATEWAY_URL ? 'SET' : 'MISSING',
            AI_GATEWAY_USE_CASE_ID: envVars.AI_GATEWAY_USE_CASE_ID ? 'SET' : 'MISSING',
            AI_GATEWAY_CLOUD_ID: envVars.AI_GATEWAY_CLOUD_ID ? 'SET' : 'MISSING',
            AI_GATEWAY_USER_ID: envVars.AI_GATEWAY_USER_ID ? 'SET' : 'MISSING',
            ASAP_PRIVATE_KEY: key ? 'SET' : 'MISSING'
        },
        keyDebug: key ? {
            length: key.length,
            startsWithBegin: key.substring(0, 15),
            hasNewlines: key.includes('\n'),
            hasLiteralBackslashN: key.includes('\\n')
        } : null
    };

    res.status(200).json(response);
});

// Serve static files from Next.js export output
const publicPath = path.join(__dirname, 'public');
console.log(`[STARTUP] Serving static files from: ${publicPath}`);

// Serve all static files (CSS, JS, images, etc.)
app.use(express.static(publicPath));

// For all other routes, try to serve the corresponding HTML file or fallback to index.html
// This supports Next.js client-side routing
app.get('*', (req, res) => {
    console.log(`[STATIC] Request for route: ${req.path}`);

    // Try to serve index.html for SPA routing
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.log(`[STATIC] index.html not found at ${indexPath}`);
            // If index.html doesn't exist, return a minimal HTML page
            res.status(200).send(`<!DOCTYPE html>
<html>
<head>
<title>VPK Prototype</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="root">
<h1>VPK Prototype Service</h1>
<p>Service is running and ready to serve content.</p>
<p><a href="/healthcheck">Health Check</a></p>
<p><a href="/api/health">API Health Check</a></p>
</div>
</body>
</html>`);
        }
    });
});

console.log('[STARTUP] All routes registered, starting HTTP server...');

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`[STARTUP] ✓ Server listening on 0.0.0.0:${port}`);
    console.log(`\n${'='.repeat(60)}`)
    console.log(`Server ready for connections`);
    console.log('Environment check:');
    console.log(`  PORT: ${port}`);
    console.log(`  AI_GATEWAY_URL: ${process.env.AI_GATEWAY_URL ? 'SET' : 'MISSING'}`);
    console.log(`  Debug Mode: ${DEBUG}`);

    console.log('\n🔐 Using ASAP Authentication');
    console.log(`  ASAP_ISSUER: ${process.env.ASAP_ISSUER ? 'SET' : 'MISSING'}`);
    console.log(`  ASAP_KID: ${process.env.ASAP_KID ? 'SET' : 'MISSING'}`);
    console.log(`  ASAP_PRIVATE_KEY: ${process.env.ASAP_PRIVATE_KEY ? 'SET' : 'MISSING'}`);
    console.log(`${'='.repeat(60)}\n`);

    if (DEBUG) {
        console.log('[DEBUG MODE ENABLED]');
        console.log('  All debug logs will be printed');
        console.log('  To disable: DEBUG=false\n');
    }
});

// Handle any startup errors
server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
