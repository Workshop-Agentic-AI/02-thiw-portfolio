---
description: แสดงสถานะโปรเจกต์ (issues, PRs, commits)
---

# List Project Status (lll)

แสดงสถานะโปรเจกต์แบบครบถ้วน

## Instructions

รันคำสั่งเหล่านี้แบบ parallel:

```bash
# Open issues
gh issue list --state open --limit 10

# Open PRs
gh pr list --state open --limit 10

# Recent commits
git log --oneline -10

# Current status
git status --short

# Current branch
git branch --show-current
```

## Output Format

แสดงผลในรูปแบบ visual summary:

```markdown
## Project Status

### Current Focus
**Branch**: [branch] ([clean/dirty])

---

### Open Issues
| # | Title | Status |
|---|-------|--------|
| X | [title] | OPEN |

---

### Open PRs
| # | Title | Status |
|---|-------|--------|
| X | [title] | OPEN |

---

### Recent Commits
[git log output]

---

### Summary
| Metric | Value |
|--------|-------|
| Open Issues | X |
| Open PRs | X |
| Working Dir | Clean/Dirty |

---

### Next Action
[Suggest what to do next based on status]
```

## Tips
- ถ้ามี open plan issue ให้แนะนำ `/gogogo`
- ถ้า working dir dirty ให้แนะนำ commit หรือ stash
- ถ้าไม่มี plan ให้แนะนำ `/nnn`
