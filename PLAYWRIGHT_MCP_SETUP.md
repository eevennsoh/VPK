# Playwright MCP Setup Guide - Browser Debugging

## Overview

Playwright MCP (Model Context Protocol) tools allow Codelassian and other AI agents to see and interact with your prototype in a real browser. This is extremely useful for debugging visual issues, testing interactions, and verifying functionality.

**Why is this useful?**
- See what the prototype actually looks like visually
- Click buttons, fill forms, interact with the UI
- Debug layout and styling issues
- Test user flows end-to-end
- Verify AI responses display correctly in the UI

## Prerequisites

- Node.js 18+ (already installed if you followed SETUP_GUIDE.md)
- VS Code with Codelassian extension
- Your prototype running locally (`./scripts/start-dev.sh`)

## Installation

### Step 1: Install Playwright MCP

```bash
npm install -g @playwright/mcp
```

Or install just for this project:
```bash
npm install --save-dev @playwright/mcp
```

### Step 2: Find Your Playwright Browser Executable

Playwright installs browser binaries in a cache. You need to find the path to the browser executable.

**First, ensure browsers are installed:**
```bash
npx playwright install
```

**Find the executable path:**

**macOS:**
```bash
# Find Chromium (most common)
find ~/Library/Caches/ms-playwright -name "Chromium.app" -type d

# Output will be something like:
# /Users/YOUR_USERNAME/Library/Caches/ms-playwright/chromium-1117/chrome-mac/Chromium.app
# Full executable path:
# /Users/YOUR_USERNAME/Library/Caches/ms-playwright/chromium-1117/chrome-mac/Chromium.app/Contents/MacOS/Chromium
```

**Linux:**
```bash
find ~/.cache/ms-playwright -name "chrome" -type f
# Output: /home/YOUR_USERNAME/.cache/ms-playwright/chromium-1117/chrome-linux/chrome
```

**Windows (PowerShell):**
```powershell
Get-ChildItem -Path "$env:USERPROFILE\AppData\Local\ms-playwright" -Recurse -Filter "chrome.exe"
# Output: C:\Users\YOUR_USERNAME\AppData\Local\ms-playwright\chromium-1117\chrome-win\chrome.exe
```

### Step 3: Update `.vscode/mcp.json`

Add the Playwright configuration to your `.vscode/mcp.json` file:

```json
{
  "playwright": {
    "command": "npx",
    "args": [
      "@playwright/mcp@latest",
      "--executable-path",
      "/Users/YOUR_USERNAME/Library/Caches/ms-playwright/chromium-1117/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
    ],
    "disabledTools": [
      "browser_take_screenshot"
    ],
    "disabled": false
  }
}
```

**Replace:**
- `/Users/YOUR_USERNAME/...` with the actual path you found in Step 2
- The number after `chromium-` may be different (this is the browser version)

### Step 4: Restart VS Code

Close and reopen VS Code, or reload the window (Cmd+Shift+P → "Reload Window").

## Usage

Once set up, you can tell Codelassian to:

**Debug visually:**
> "Open the prototype in a browser and show me what it looks like"

**Test interactions:**
> "Click the 'Ask Rovo' button in the chat panel and take a screenshot"

**Verify functionality:**
> "Type a message in the chat and show me if the response appears"

**Debug UI issues:**
> "The chat panel doesn't look right. Open it in a browser and check the layout"

## Why Disable Screenshots?

The `browser_take_screenshot` tool is disabled because:
- Screenshots consume significant token usage
- Browser interactions (clicking, typing, etc.) are more efficient for debugging
- You can ask Codelassian to describe what it sees instead of sending images

Use commands like:
- ✅ "Click the button and tell me what happens"
- ✅ "Fill in the form and verify the response"
- ❌ "Take a screenshot" (expensive and usually not needed)

## Troubleshooting

### "Executable not found" Error

**Problem:** The browser path is wrong or outdated

**Solution:**
1. Reinstall browsers: `npx playwright install`
2. Find the new path: `find ~/Library/Caches/ms-playwright -name "Chromium.app"`
3. Update `.vscode/mcp.json` with the new path
4. Restart VS Code

### "Chromium not installed" Error

**Problem:** Playwright browsers not installed

**Solution:**
```bash
npx playwright install
```

### VS Code says "MCP not configured"

**Problem:** `.vscode/mcp.json` not set up correctly

**Solution:**
1. Check `.vscode/mcp.json` exists
2. Verify JSON syntax is valid (use VS Code's JSON validator)
3. Check the executable path is correct
4. Restart VS Code

### Browser won't open

**Problem:** Playwright can't launch the browser

**Solution:**
1. Verify the executable path points to an actual file:
   ```bash
   ls -la "/Users/USERNAME/Library/Caches/ms-playwright/chromium-XXXX/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
   ```
2. Make sure your prototype is running: `./scripts/start-dev.sh`
3. Try reinstalling browsers: `npx playwright install chromium`

## Advanced: Using Chrome Instead of Chromium

If you prefer to use the system Chrome browser:

1. Find Chrome path (macOS):
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
   ```

2. Update `.vscode/mcp.json`:
   ```json
   {
     "playwright": {
       "command": "npx",
       "args": [
         "@playwright/mcp@latest",
         "--executable-path",
         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
       ],
       "disabledTools": ["browser_take_screenshot"],
       "disabled": false
     }
   }
   ```

## Documentation

- **Official Playwright MCP:** https://github.com/microsoft/playwright-mcp
- **Playwright Documentation:** https://playwright.dev
- **VS Code MCP Documentation:** https://code.visualstudio.com/docs/copilot/mcp

## Cost Optimization Tips

1. **Disable screenshots** - Already done in default config
2. **Use specific selectors** - "Click the button with text 'Send'" is better than "find and click a button"
3. **Ask for descriptions** - "What do you see?" instead of "Take a screenshot"
4. **Batch interactions** - "Fill the form AND click submit" instead of two separate requests

## When to Use Browser Debugging

### Good Use Cases:
- ✅ Visual layout issues ("The chat panel is cut off")
- ✅ Button/form interactions not working
- ✅ Testing user flows ("Can I complete the sign-up?")
- ✅ Verifying AI responses display correctly
- ✅ Testing responsive design

### Overkill / Not Needed:
- ❌ Checking if text is present (use API calls)
- ❌ Verifying environment variables
- ❌ Debugging server-side logic
- ❌ Performance testing (use profiler instead)

## Integration with Your Workflow

Typical debugging session:

1. **Issue:** "The chat input isn't accepting text"
2. **Codelassian:** "I'll open it in a browser to check" (uses Playwright)
3. **Codelassian:** "I clicked on the input field. The text appears in the field correctly. Let me check if it submits..."
4. **Codelassian:** "I typed 'test' and clicked send. The message appears in the chat. The response is loading..."
5. **Resolution:** Found the issue! The submit button works, but the response animation is broken.

This is much faster than:
- Asking you to test manually
- Describing the issue in words
- Going back and forth with screenshots

## FAQs

**Q: Do I need this to develop?**
A: No, it's completely optional. You can test manually in your browser.

**Q: Will it slow down my development?**
A: No, it only runs when Codelassian uses it.

**Q: Can I use Firefox or Safari?**
A: Yes, but you need to install those browsers and find their paths. Chromium is recommended because it's most reliable.

**Q: Why doesn't it take screenshots by default?**
A: Screenshots are expensive in terms of tokens and usually not necessary. Codelassian can interact and describe what it sees.

**Q: What if I want screenshots?**
A: You can re-enable the tool, but it's not recommended for cost reasons. Use interactions instead.
