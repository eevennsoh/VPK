#!/usr/bin/env node
/**
 * Creates .env.local from .asap-config
 * Usage: node create-env-local.js <use-case-id> [email]
 *        use-case-id: REQUIRED - Your AI Gateway use case ID
 *        email: Optional - defaults to git config user.email
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Get use case ID from args (REQUIRED)
const useCaseId = process.argv[2];
if (!useCaseId) {
	console.error('❌ Use case ID is required. Usage:');
	console.error('   node create-env-local.js <use-case-id> [email]');
	console.error('');
	console.error('Example:');
	console.error('   node create-env-local.js my-use-case your-email@atlassian.com');
	process.exit(1);
}

// Get email from args or git config
let email = process.argv[3];
if (!email) {
	try {
		email = execSync('git config user.email', { encoding: 'utf8' }).trim();
	} catch {
		console.error('❌ Could not determine email. Please provide as argument:');
		console.error('   node create-env-local.js ' + useCaseId + ' your-email@atlassian.com');
		process.exit(1);
	}
}

// Check for .asap-config
if (!fs.existsSync('.asap-config')) {
	console.error('❌ .asap-config not found. Generate it first with:');
	console.error('   TIMESTAMP=$(date +%s)');
	console.error('   atlas asap key generate --key ' + useCaseId + '/$TIMESTAMP --file .asap-config');
	process.exit(1);
}

const config = JSON.parse(fs.readFileSync('.asap-config', 'utf8'));
const escaped = config.privateKey.replace(/\n/g, '\\n');

const envContent = `# AI Gateway Configuration
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions
AI_GATEWAY_USE_CASE_ID=${useCaseId}
AI_GATEWAY_CLOUD_ID=local-testing
AI_GATEWAY_USER_ID=${email}

# ASAP Credentials (Required for browser VMs and production)
ASAP_PRIVATE_KEY="${escaped}"
ASAP_KID=${config.kid}
ASAP_ISSUER=${config.issuer}

# Frontend configuration (for production builds)
# NEXT_PUBLIC_API_URL=https://your-service-name.us-west-2.platdev.atl-paas.net
`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ Created .env.local with OpenAI URL');
console.log(`   AI_GATEWAY_USE_CASE_ID: ${useCaseId}`);
console.log(`   AI_GATEWAY_USER_ID: ${email}`);
