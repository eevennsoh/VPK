# AI Model Switching Guide

This guide explains how to switch between different AI models (e.g., from Claude to OpenAI ChatGPT) in the Rovo Chat prototype.

---

## 🤖 Quick Start for AI Agents

If you're an AI agent helping a user switch models, **START HERE**:

### Step-by-Step Agent Workflow

**STEP 1:** Read `rovo/config.ts` and identify current provider:
- Contains `anthropic_version` → Currently using Claude
- Contains `model: "gpt-` or `model: "o1-"` → Currently using OpenAI

**STEP 2:** Get the AI Gateway use case ID:
- If user provided it in their request, use that
- Otherwise, ask: "What is your AI Gateway use case ID?" (e.g., caid-proto)

**STEP 3:** Run command to get whitelisted models:
```bash
atlas ml aigateway usecase view --id USE-CASE-ID -e stg-west
```
- If the command fails (e.g., `atlas` CLI not available), ask user to run it and paste the output

**STEP 4:** Parse output for `offerings` section, list whitelisted models for user

**STEP 5:** Ask user: "Which model do you want to switch to from this list?"

**STEP 6:** Determine change scope:
```
Current: Claude + Target: OpenAI  → Edit 4 files (full switch)
Current: OpenAI + Target: Claude  → Edit 4 files (full switch)  
Current: Claude + Target: Claude  → Edit 2 files (model only)
Current: OpenAI + Target: OpenAI  → Edit 2 files (model only)
```

**STEP 7:** Make the edits (see detailed instructions below)

**STEP 8:** Instruct user: "Restart `npm run dev` and try sending a chat message"

### Files to Edit (by scenario)

**Same provider (2 files):**
- `rovo/config.ts` - change model ID only
- `rovo/config.js` - change model ID only

**Different provider (4 files):**
- `rovo/config.ts` - change model ID + payload structure + interface
- `rovo/config.js` - change model ID + payload structure
- `app/api/rovo-chat/route.ts` - change endpoint URL + response parsing
- `backend/server.js` - change endpoint URL + response parsing

---

## Overview

This prototype supports two runtime modes:
- **Local Development**: Uses Next.js API route at `app/api/rovo-chat/route.ts`
- **Production (Deployed)**: Uses Express backend server at `backend/server.js`

Both modes share the same configuration files, so changes apply to both environments.

---

## 🚨 CRITICAL: Determine Current State First

Before following any steps, **identify what model type you're currently using and what you want to switch to**:

### Current Model Type Check

Look at `rovo/config.ts` in the `buildAIGatewayPayload` function:

**If you see:**
```typescript
anthropic_version: "bedrock-2023-05-31"
```
→ You're currently using **Claude/Bedrock**

**If you see:**
```typescript
model: "gpt-4..." or model: "o1-..." or model: "o3-..."
```
→ You're currently using **OpenAI**

### Switching Scenarios

Based on current and target models:

| Current | Target | Steps Required |
|---------|--------|----------------|
| **Claude** → **OpenAI** | Follow Steps 1, 2, 3, 4, 5 (all steps) |
| **OpenAI** → **Claude** | Follow Steps 1, 2, 3, 4, 5 (all steps) |
| **OpenAI** → **Different OpenAI** | Follow Steps 1, 2 only (skip 3, 4, 5) |
| **Claude** → **Different Claude** | Follow Steps 1, 2 only (skip 3, 4, 5) |

---

## Prerequisites

Before switching models, you need:
1. Your **AI Gateway Use Case ID** (e.g., `caid-proto`)
2. Access to the `atlas` CLI tool
3. Knowledge of which models are whitelisted for your use case

**For AI Agents:** Get the use case ID from the user's request if provided, otherwise ask for it.

---

## Step 1: Check Whitelisted Models

First, find which models are available and whitelisted for your use case.

### 1.1 List Available Models by Vendor (Optional)

To see all OpenAI models:
```bash
atlas ml aigateway model list -x "vendor=openai"
```

To see all Anthropic (Claude) models:
```bash
atlas ml aigateway model list -x "vendor=anthropic"
```

### 1.2 Check Your Use Case Whitelist

**Run this command** (replace `YOUR-USE-CASE-ID` with your actual use case ID):

```bash
atlas ml aigateway usecase view --id YOUR-USE-CASE-ID -e stg-west
```

**For AI Agents:** You can run this command directly. If it fails, ask the user to run it and paste the output.

Look for the `offerings` section in the output. This lists all whitelisted model IDs.

**Example output snippet:**
```json
"offerings": [
  {
    "id": "gpt-4.1-mini-2025-04-14",
    "type": "MODEL_ID"
  },
  {
    "id": "anthropic.claude-3-5-sonnet-20241022-v2:0",
    "type": "MODEL_ID"
  }
]
```

**📝 Note down one of the whitelisted model IDs** - you'll need it in the next step.

---

## Step 2: Update Model Configuration

⚠️ **IMPORTANT:** The exact location and content to change depends on your current model type.

### 2.1 Update TypeScript Config

Edit `rovo/config.ts`:

**Find the `buildAIGatewayPayload` function** and look for the `return` statement.

#### If Currently Using OpenAI (Simple Model ID Change)

Find the line with `model:` in the return statement:
```typescript
return {
  model: "gpt-4.1-mini-2025-04-14",  // ← Change this to your new model ID
  messages: messages,
  max_tokens: 2000,
  temperature: 1,
  stream: true
};
```

Just change the model ID string to your new OpenAI model.

#### If Currently Using Claude (Model ID Change)

Find the line with `anthropic_version:` - the model is specified in the AI_GATEWAY_URL environment variable instead.
**Skip to Step 5** for full payload restructuring if switching to OpenAI.

### 2.2 Update JavaScript Config (for Backend)

Edit `rovo/config.js`:

**Find the same section** (around line 79-108) and make the **same change**:
```javascript
return {
  model: "gpt-4.1-mini-2025-04-14",  // Same model ID as above
  messages: messages,
  max_tokens: 2000,
  temperature: 1,
  stream: true
};
```

---

## Step 3: Update API Endpoints

The endpoint URL differs between OpenAI and Claude/Bedrock models.

### 3.1 Update Next.js API Route (Local Development)

Edit `app/api/rovo-chat/route.ts`:

**Find this section** (around line 53-60):

**For OpenAI models:**
```typescript
const token = generateAsapToken();

// Use OpenAI endpoint
const baseUrl = process.env.AI_GATEWAY_URL!.split('//')[0] + '//' + process.env.AI_GATEWAY_URL!.split('//')[1].split('/')[0];
const openaiUrl = `${baseUrl}/v1/openai/v1/chat/completions`;

console.log('Using OpenAI endpoint:', openaiUrl);

const response = await fetch(openaiUrl, {
```

**For Claude/Bedrock models:**
```typescript
const token = generateAsapToken();

// Use Bedrock endpoint
const streamingUrl = process.env.AI_GATEWAY_URL!.replace('/invoke', '/invoke-with-response-stream');

const response = await fetch(streamingUrl, {
```

### 3.2 Update Backend Server (Production)

Edit `backend/server.js`:

**Find this section** (around line 100-118):

**For OpenAI models:**
```javascript
const token = generateAsapToken();

// Use OpenAI endpoint
let baseUrl;
if (ENV_VARS.AI_GATEWAY_URL.includes('//')) {
  const urlParts = ENV_VARS.AI_GATEWAY_URL.split('/');
  baseUrl = `${urlParts[0]}//${urlParts[2]}`;
} else {
  baseUrl = ENV_VARS.AI_GATEWAY_URL.split('/v1/')[0];
}
const openaiUrl = `${baseUrl}/v1/openai/v1/chat/completions`;

console.log('Using OpenAI endpoint:', openaiUrl);

const aiPayload = buildAIGatewayPayload(message, conversationHistory, customSystemPrompt);

const aiResponse = await fetch(openaiUrl, {
```

**For Claude/Bedrock models:**
```javascript
const token = generateAsapToken();
const streamingUrl = ENV_VARS.AI_GATEWAY_URL.replace('/invoke', '/invoke-with-response-stream');

const aiPayload = buildAIGatewayPayload(message, conversationHistory, customSystemPrompt);

const aiResponse = await fetch(streamingUrl, {
```

---

## Step 4: Update Response Parsing

The streaming response format differs between providers.

### 4.1 Update Next.js API Route Response Parsing

Edit `app/api/rovo-chat/route.ts`:

**Find the response parsing section** (around line 94-115):

**For OpenAI models:**
```typescript
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
        // ... rest of widget logic
      }
    } catch (e) {
      // Skip invalid JSON
    }
  }
}
```

**For Claude/Bedrock models:**
```typescript
for (const line of lines) {
  if (line.startsWith('data: ')) {
    try {
      const data = JSON.parse(line.slice(6));
      
      // Extract text from Bedrock streaming format
      if (data.delta?.text) {
        accumulatedText += data.delta.text;
        // ... rest of widget logic
      }
    } catch (e) {
      // Skip invalid JSON
    }
  }
}
```

### 4.2 Update Backend Server Response Parsing

Edit `backend/server.js`:

**Find the response parsing section** (around line 144-169):

Apply the **same changes** as above:

**For OpenAI:** Use `data.choices?.[0]?.delta?.content`
**For Claude/Bedrock:** Use `data.delta?.text`

---

## Step 5: Update Payload Structure (OpenAI Only)

### 5.1 Update TypeScript Payload Interface

Edit `rovo/config.ts`:

**Find the interface** (around line 84-95):

**For OpenAI models:**
```typescript
export interface AIGatewayPayload {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
}
```

**For Claude/Bedrock models:**
```typescript
export interface AIGatewayPayload {
  anthropic_version: string;
  max_tokens: number;
  system: string;
  messages: Array<{
    role: string;
    content: Array<{
      type: string;
      text: string;
    }>;
  }>;
}
```

### 5.2 Update Payload Builder Function

In the same file, update `buildAIGatewayPayload()`:

**For OpenAI models:**
```typescript
export function buildAIGatewayPayload(
  message: string,
  conversationHistory?: ConversationMessage[],
  customSystemPrompt?: string
): AIGatewayPayload {
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    {
      role: "system",
      content: buildSystemPrompt(customSystemPrompt)
    }
  ];

  // Add conversation history
  if (conversationHistory && conversationHistory.length > 0) {
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      });
    });
  }

  // Add current message
  messages.push({
    role: "user",
    content: message
  });

  return {
    model: "gpt-4.1-mini-2025-04-14",
    messages: messages,
    max_tokens: 2000,
    temperature: 1,
    stream: true
  };
}
```

**For Claude/Bedrock models:**
```typescript
export function buildAIGatewayPayload(
  message: string,
  conversationHistory?: ConversationMessage[],
  customSystemPrompt?: string
): AIGatewayPayload {
  return {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
    system: buildSystemPrompt(customSystemPrompt),
    messages: [{
      role: "user",
      content: [{
        type: "text",
        text: buildUserMessage(message, conversationHistory)
      }]
    }]
  };
}
```

**Repeat the same changes in `rovo/config.js`**

---

## Step 6: Test Your Changes

### 6.1 Test Local Development

1. **Restart the Next.js dev server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to `http://localhost:3000`

3. **Send a test message** in the chat

4. **Check the terminal logs** for:
   - ✅ Correct endpoint being called (OpenAI or Bedrock)
   - ✅ No 400/500 errors
   - ✅ Successful response

### 6.2 Test Production Deployment

After deploying:

1. **Check backend server logs** for the correct endpoint
2. **Send test messages** to verify responses
3. **Monitor for errors** in the deployment logs

---

## Common Issues & Troubleshooting

### Issue: "Model not whitelisted for use-case"

**Solution:** Go back to Step 1 and verify the model ID is in your use case's whitelist. You may need to request whitelisting from the ML Platform team.

### Issue: "Model Id [model-name] not found"

**Solution:** The model ID is incorrect. Run `atlas ml aigateway model list -x "vendor=openai"` to find the exact model ID.

### Issue: Changes not taking effect

**Solution:** 
- For local dev: Restart `npm run dev`
- For production: Redeploy the application
- Clear browser cache if needed

### Issue: "Cannot deserialize" error

**Solution:** This means the payload format doesn't match the endpoint:
- OpenAI endpoint requires OpenAI format (flat messages array)
- Bedrock endpoint requires Anthropic format (nested content structure)

---

## Quick Reference: Model Comparison

| Provider | Example Model ID | Endpoint Path | Response Field |
|----------|-----------------|---------------|----------------|
| **OpenAI** | `gpt-4.1-mini-2025-04-14` | `/v1/openai/v1/chat/completions` | `data.choices[0].delta.content` |
| **Claude (Bedrock)** | `anthropic.claude-3-5-sonnet-20241022-v2:0` | `/v1/bedrock/model/{model}/invoke-with-response-stream` | `data.delta.text` |

---

## Summary Checklist

Before deploying your model change, ensure:

- [ ] Checked whitelisted models for your use case
- [ ] Updated model ID in `rovo/config.ts`
- [ ] Updated model ID in `rovo/config.js`
- [ ] Updated endpoint URL in `app/api/rovo-chat/route.ts`
- [ ] Updated endpoint URL in `backend/server.js`
- [ ] Updated response parsing in `app/api/rovo-chat/route.ts`
- [ ] Updated response parsing in `backend/server.js`
- [ ] Updated payload structure (if switching between OpenAI/Claude)
- [ ] Tested locally with `npm run dev`
- [ ] Deployed and tested in production environment

---

## For AI Agents: Exact Workflow

### Phase 1: Discovery
1. Get the AI Gateway use case ID from the user's request, or ask if not provided
2. Run: `atlas ml aigateway usecase view --id USE-CASE-ID -e stg-west`
   - If this fails (e.g., `atlas` CLI not available), ask the user to run it and paste the output
3. Parse the output for model IDs in the `offerings` section
4. Ask: "Which of these whitelisted models do you want to use: [list them]"

### Phase 2: Determine Scope
1. Read `rovo/config.ts` 
2. Search for `anthropic_version` or look at the `model:` field
3. If switching Claude ↔ OpenAI: Full change (all 4 files)
4. If staying within provider: Minimal change (2 files)

### Phase 3: Make Changes

**Use these exact search strings when using the edit tool:**

For `rovo/config.ts`:
- Search for: `return {` inside `buildAIGatewayPayload` function
- Or search for: `export function buildAIGatewayPayload`

For `rovo/config.js`:
- Search for: `function buildAIGatewayPayload`
- Replace the entire return statement

For `app/api/rovo-chat/route.ts`:
- Search for: `const token = generateAsapToken();` (around line 53)
- Replace the next 3-5 lines for endpoint URL

For `backend/server.js`:
- Search for: `const token = generateAsapToken();` (around line 100)
- Replace the next 3-5 lines for endpoint URL

### Phase 4: Verify
1. Instruct user: "Please restart your dev server with `npm run dev`"
2. Instruct user: "Try sending a chat message and paste any errors"
3. If errors, check troubleshooting section

### What You Can Do
- Read all code files
- Edit all code files using the edit tool
- Run `atlas` CLI commands (if available in the environment)
- Parse command output to find whitelisted models
- Make all necessary code changes automatically

### What You Cannot Do
- Access `.env.local` file directly (it's gitignored)
- Know the user's use case ID without it being provided

### Fallback Strategy
If you cannot run commands (e.g., `atlas` CLI not installed):
- Ask the user to run the command and paste the output
- Parse their output to proceed with the model switch
