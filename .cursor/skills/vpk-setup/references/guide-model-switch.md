# AI Model Switching Guide

This guide explains how to switch between Claude (Bedrock) and GPT models in VPK.

---

## Quick Reference

| Provider | Model ID | Endpoint Path |
|----------|----------|---------------|
| **Claude (Default)** | `anthropic.claude-3-5-haiku-20241022-v1:0` | `/v1/bedrock/model/{MODEL_ID}/invoke-with-response-stream` |
| **GPT** | `gpt-5.2-2025-12-11` | `/v1/openai/v1/chat/completions` |

---

## For AI Agents: Model Switching Workflow

### Step 1: Determine Current Model

Check `.env.local` for the `AI_GATEWAY_URL`:

- Contains `/v1/bedrock/model/` → Currently using **Claude**
- Contains `/v1/openai/` → Currently using **GPT**

### Step 2: Switch to Desired Model

#### Switch to GPT

Edit `.env.local` and change `AI_GATEWAY_URL` to:

```bash
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/openai/v1/chat/completions
```

#### Switch to Claude (Default)

Edit `.env.local` and change `AI_GATEWAY_URL` to:

```bash
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-haiku-20241022-v1:0/invoke-with-response-stream
```

### Step 3: Restart Dev Servers

Instruct user: "Restart dev servers with `pnpm run dev`"

---

## How It Works

The VPK backend (`backend/server.js`) and config (`rovo/config.js`) automatically detect the endpoint type from the `AI_GATEWAY_URL` and format the payload accordingly:

- **Bedrock endpoint** (`/v1/bedrock/model/`): Uses Claude format with `anthropic_version` and `max_tokens`
- **GPT endpoint** (`/v1/openai/`): Uses GPT format with `model` in payload and `max_completion_tokens`

No code changes needed - just update the URL in `.env.local` and restart.

---

## Default Configuration

By default, VPK uses **Claude via Bedrock**:

```bash
# .env.local (default - Claude)
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-haiku-20241022-v1:0/invoke-with-response-stream
```

---

## Default Models (defined in rovo/config.js)

```javascript
const DEFAULT_MODELS = {
  bedrock: "anthropic.claude-3-5-haiku-20241022-v1:0",  // Claude - model ID in URL
  openai: "gpt-5.2-2025-12-11",                         // GPT - model ID in payload
};
```

---

## Using a Different Model

### For Claude Models

Update the model ID in the URL:

```bash
# Example: Using Claude Sonnet instead of Haiku
AI_GATEWAY_URL=https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-sonnet-20241022-v2:0/invoke-with-response-stream
```

### For GPT Models

1. Set the URL to GPT endpoint in `.env.local`
2. Edit `rovo/config.js` and change the model in `DEFAULT_MODELS`:

```javascript
const DEFAULT_MODELS = {
  bedrock: "anthropic.claude-3-5-haiku-20241022-v1:0",
  openai: "gpt-4.1-2025-04-14",  // Change to your preferred GPT model
};
```

3. Also update the same in `backend/server.js` (search for `DEFAULT_MODELS`)

---

## Checking Available Models

To see which models are whitelisted for your use case:

```bash
atlas ml aigateway usecase view --id YOUR-USE-CASE-ID -e stg-west
```

Look for the `offerings` section in the output.

### Common Models

**Claude (Bedrock):**
- `anthropic.claude-3-5-haiku-20241022-v1:0` (fast, cheap)
- `anthropic.claude-3-5-sonnet-20241022-v2:0` (balanced)
- `anthropic.claude-sonnet-4-20250514-v1:0` (latest)

**GPT:**
- `gpt-5.2-2025-12-11` (latest)
- `gpt-4.1-mini-2025-04-14` (fast, cheap)
- `gpt-4.1-2025-04-14` (balanced)

---

## Troubleshooting

### "Model Id [X] not found"

The model isn't whitelisted for your use case. Run:
```bash
atlas ml aigateway usecase view --id YOUR-USE-CASE-ID -e stg-west
```

Use one of the models listed in `offerings`.

### "Unsupported parameter: 'max_tokens'"

You're using a newer GPT model that requires `max_completion_tokens` instead of `max_tokens`. This is already handled in the codebase - make sure you have the latest `rovo/config.js`.

### "not available for the OpenAI vendor"

You're using a Claude model ID with the GPT endpoint. Either:
- Switch to Bedrock endpoint for Claude models
- Use a GPT model ID with the GPT endpoint

### Changes not taking effect

Restart the dev servers:
```bash
# Stop current servers (Ctrl+C)
# Then restart
pnpm run dev
```

---

## Technical Details

### Claude (Bedrock) Payload Format

```json
{
  "anthropic_version": "bedrock-2023-05-31",
  "max_tokens": 2000,
  "system": "You are an AI assistant...",
  "messages": [
    {
      "role": "user",
      "content": [{ "type": "text", "text": "Hello" }]
    }
  ]
}
```

### GPT Payload Format

```json
{
  "model": "gpt-5.2-2025-12-11",
  "messages": [
    { "role": "system", "content": "You are an AI assistant..." },
    { "role": "user", "content": "Hello" }
  ],
  "max_completion_tokens": 2000,
  "temperature": 1,
  "stream": true
}
```

### Response Parsing

- **Claude (Bedrock)**: `data.delta?.text`
- **GPT**: `data.choices?.[0]?.delta?.content`

The backend handles both formats automatically.

---

## Files Reference

| File | Purpose |
|------|---------|
| `.env.local` | Contains `AI_GATEWAY_URL` - determines which provider is used |
| `rovo/config.js` | Contains `DEFAULT_MODELS` and `buildAIGatewayPayload()` |
| `backend/server.js` | Backend with fallback model definitions |
