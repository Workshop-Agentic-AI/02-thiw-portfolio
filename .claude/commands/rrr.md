---
description: Create comprehensive session retrospective
---

# Session Retrospective (rrr)

สร้างเอกสารสรุป session อย่างละเอียด

**สำคัญ**: AI Diary และ Honest Feedback เป็น sections ที่ต้องมี - ห้ามข้าม!

## Instructions

1. **Gather Session Data**:
   ```bash
   git diff --name-only main...HEAD
   git log --oneline main...HEAD
   ```

2. **Get Current Time** (GMT+7):
   ```bash
   TZ='Asia/Bangkok' date +"%Y-%m-%d %H:%M"
   ```

3. **Create Directory**:
   ```bash
   mkdir -p retrospectives/$(date +%Y/%m)
   ```

4. **Create Retrospective File** at:
   ```
   retrospectives/YYYY/MM/YYYY-MM-DD_HH-MM_retrospective.md
   ```

5. **Use This Template** (ทุก section ต้องกรอก):

```markdown
# Session Retrospective

**Session Date**: [DATE]
**Start Time**: [TIME] GMT+7
**End Time**: [TIME] GMT+7
**Duration**: ~X minutes
**Primary Focus**: [Brief description]
**Session Type**: [Feature Development | Bug Fix | Research | Refactoring]
**Current Issue**: #XXX

## Session Summary
[2-3 sentence overview]

## Timeline
- HH:MM - Started session
- HH:MM - [Event]
- HH:MM - Completed

## Technical Details

### Files Modified
[list files]

### Key Code Changes
- Component: Change description

### Architecture Decisions
- Decision: Rationale

## AI Diary (REQUIRED - DO NOT SKIP)
[First-person narrative of experience:
- Initial understanding and assumptions
- How approach evolved
- Moments of confusion or clarity
- Decisions made and why
- What surprised you]

## What Went Well
- Success 1
- Success 2

## What Could Improve
- Area 1
- Area 2

## Blockers & Resolutions
- **Blocker**: Description
  **Resolution**: How solved

## Honest Feedback (REQUIRED - DO NOT SKIP)
[Frank assessment of:
- Session effectiveness
- Tool performance
- Communication clarity
- What frustrated you
- What delighted you]

## Lessons Learned
- **Pattern**: [Description] - Why it matters
- **Mistake**: [What happened] - How to avoid

## Next Steps
- [ ] Task 1
- [ ] Task 2

## Related Resources
- Issue: #XXX
- PR: #XXX

## Validation Checklist
- [ ] AI Diary has detailed narrative
- [ ] Honest Feedback has frank assessment
- [ ] All sections complete
```

6. **Update CLAUDE.md** - Append new lessons learned to bottom

7. **Commit**:
   ```bash
   git add retrospectives/
   git commit -m "docs: Add session retrospective [DATE]"
   ```

8. **Comment on Issue** (if applicable):
   ```bash
   gh issue comment XXX --body "Session retrospective: [path]"
   ```

## Time Zone Note
- **Primary: GMT+7 (Bangkok)** - แสดง GMT+7 ก่อนเสมอ
- UTC แสดงเป็น reference ในวงเล็บ
