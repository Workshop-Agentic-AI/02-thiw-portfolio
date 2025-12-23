---
description: สร้าง context issue และบีบอัดการสนทนา
---

# Create Context & Compact (ccc)

บันทึก context ปัจจุบันเป็น GitHub issue แล้ว compact conversation

## Instructions

1. **Gather Information** - รันคำสั่งเหล่านี้:
   ```bash
   git status --porcelain
   git log --oneline -5
   gh issue list --state open --limit 5
   ```

2. **Create GitHub Context Issue** ด้วย template:

   **Title**: `context: [Brief summary]`

   **Body**:
   ```markdown
   ## Session Context - [DATE]

   ### Current State
   - Working directory: [clean/dirty]
   - Branch: [branch name]

   ### Recent Commits
   [paste git log output]

   ### What Was Done This Session
   [Summary of activities]

   ### Key Discoveries
   - [Discovery 1]
   - [Discovery 2]

   ### Open Issues
   [List open issues]

   ### Next Steps
   - [ ] Next action 1
   - [ ] Next action 2
   ```

3. **After creating the issue**, tell user to run `/compact` to save tokens

## Output
- Provide the created issue URL
- Remind user to run `/compact`
