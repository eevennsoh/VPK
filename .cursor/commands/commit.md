# Commit - Git Workflow

## Step 0: Check Current Branch Safety

**CRITICAL: Before committing, check if on main branch:**

```bash
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
```

### If on `main` branch:

**⚠️ DO NOT commit directly to main!**

**Instead, create a feature branch:**

```bash
# Ask user for branch name
# Suggest: feature/description or fix/description

# Stash current changes
git stash

# Create and switch to new branch
git checkout -b feature/your-feature-name

# Pop stashed changes
git stash pop

# Now proceed with commit (see below)
```

### If on a different branch:

Proceed with normal commit flow.

## Quick Commit Workflow

```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "Your descriptive commit message"

# 4. Push (handles new branches - see below)
git push -u origin $(git branch --show-current)
```

**Note:** The `-u` flag sets up tracking for new branches. If branch already exists remotely, regular `git push` works too.

## Detailed Workflow with Safety Checks

### 1. Safety Check: Main Branch Protection

```bash
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "⚠️  WARNING: You're on main branch!"
    echo "Creating feature branch instead..."
    
    # Ask user for feature name
    read -p "Enter feature/branch name: " BRANCH_NAME
    
    # Stash changes
    git stash
    
    # Create new branch
    git checkout -b $BRANCH_NAME
    
    # Apply changes
    git stash pop
    
    echo "✅ Switched to branch: $BRANCH_NAME"
fi
```

### 2. Review Changes
```bash
git status              # See what changed
git diff                # See detailed changes
git diff --cached       # See staged changes
```

### 3. Stage Changes
```bash
git add .                           # All changes
git add path/to/file.ts             # Specific file
git add app/components/*.tsx        # By pattern
```

### 4. Commit with Good Message
```bash
git commit -m "Brief summary of changes"
```

**Good examples:**
- ✅ `"Add user authentication flow"`
- ✅ `"Fix chat streaming response format"`
- ✅ `"Update deployment guide with new env vars"`

**Bad examples:**
- ❌ `"fix bug"` (too vague)
- ❌ `"stuff"` (not descriptive)
- ❌ `"wip"` (not ready to commit)

### 5. Push (with New Branch Support)

```bash
# For new branches or first push
git push -u origin $(git branch --show-current)

# For existing branches with tracking
git push
```

**The `-u` flag:**
- Sets up tracking between local and remote branch
- Only needed for first push of a new branch
- Makes future `git push` commands simpler

## Common Scenarios

### Scenario 1: Working on Main by Accident

**Problem:** Started working on main branch without creating feature branch.

**Solution:**
```bash
# Stash your changes
git stash

# Create feature branch
git checkout -b feature/your-feature-name

# Apply changes
git stash pop

# Commit and push
git add .
git commit -m "Your message"
git push -u origin feature/your-feature-name
```

### Scenario 2: First Push to New Branch

**Problem:** Created local branch, need to push for first time.

**Solution:**
```bash
# Push with upstream tracking
git push -u origin $(git branch --show-current)

# Future pushes can use just:
git push
```

### Scenario 3: Trying to Push to Main

**Problem:** Accidentally committed to main and trying to push.

**Solution:**
```bash
# 1. Reset commit (keep changes)
git reset --soft HEAD~1

# 2. Stash changes
git stash

# 3. Create feature branch
git checkout -b feature/your-feature-name

# 4. Apply and commit
git stash pop
git add .
git commit -m "Your message"
git push -u origin feature/your-feature-name
```

### Scenario 4: Create New Branch from Current Work

**Already have uncommitted changes:**
```bash
git checkout -b feature/your-feature-name
# Changes come with you to new branch!
git add .
git commit -m "Your message"
git push -u origin feature/your-feature-name
```

## Working with Branches

### Create New Branch
```bash
git checkout -b feature/your-feature-name
```

**Branch naming:**
- `feature/add-user-profile` - New features
- `fix/chat-streaming-bug` - Bug fixes
- `refactor/api-structure` - Refactoring
- `docs/update-setup-guide` - Documentation

### Switch Branch
```bash
git checkout branch-name
```

### Update from Main
```bash
git checkout main
git pull origin main
git checkout your-branch
git merge main
```

## Common Workflows

### Quick Fix
```bash
git add .
git commit -m "Fix typo in README"
git push
```

### New Feature
```bash
git checkout -b feature/chat-history
git add app/components/ChatHistory.tsx
git commit -m "Add chat history component"
git push -u origin feature/chat-history
```

### Amend Last Commit
```bash
# Add forgotten file
git add forgotten-file.ts
git commit --amend --no-edit
git push --force

# Change commit message
git commit --amend -m "New message"
git push --force
```

## Best Practices

✅ **Write clear messages** - Explain what and why
✅ **Commit frequently** - Logical units of work  
✅ **Keep commits focused** - One feature/fix per commit  
✅ **Test before committing** - Run `npm run dev`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Branch Issues** | |
| On main branch by accident | Stash → create feature branch → pop stash |
| Can't push to main (protected) | Expected! Create feature branch instead |
| "Updates were rejected" | `git pull` then resolve conflicts |
| **New Branch Issues** | |
| "No upstream branch" | Use `git push -u origin $(git branch --show-current)` |
| "Branch not found on remote" | Normal for new branches, use `-u` flag on first push |
| **Commit Issues** | |
| "Nothing to commit" | Check `git status`, then `git add .` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Undo last commit (discard) | `git reset --hard HEAD~1` |
| **Merge Issues** | |
| "Merge conflict" | Look for `<<<<<<<` markers, resolve, then commit |
| Discard all local changes | `git reset --hard HEAD && git clean -fd` |

## Commit Checklist

- [ ] **NOT on main branch** (create feature branch if needed)
- [ ] Changes tested locally (`npm run dev`)
- [ ] On correct/feature branch
- [ ] Clear, descriptive commit message
- [ ] No debug code or console.logs
- [ ] Pushed to remote with `-u` flag if new branch
- [ ] Remote branch created successfully

## Creating Pull Requests

After pushing to feature branch:
1. Go to [Bitbucket repo](https://bitbucket.org/atlassian/kg-prototyping)
2. Click "Create pull request"
3. Fill in title and description
4. Add reviewers
5. Merge when approved

## Next Steps

- Use `/redeploy` to update Micros deployment
- Use `/run` to test locally
- Create PR for team review
