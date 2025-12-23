---
description: ลุยทำตามแผนล่าสุดทีละขั้นตอน
argument-hint: "[issue number]"
---

# Execute Implementation (gogogo)

ลุยทำตามแผนล่าสุดทีละขั้นตอน

## Instructions

1. **Find the Most Recent Plan Issue**:
   ```bash
   gh issue list --search "plan:" --state open --limit 5
   ```
   - ใช้ issue number ที่ระบุ (ถ้ามี)
   - ถ้าไม่มี plan issue ให้แนะนำรัน `/nnn` ก่อน

2. **Read the Plan**:
   ```bash
   gh issue view [issue-number]
   ```

3. **Execute Each Phase**:
   - ใช้ TodoWrite tool เพื่อ track progress
   - ทำตาม implementation steps ทีละขั้น
   - ทดสอบหลังทำแต่ละ phase
   - Commit หลังจบแต่ละ phase ที่สำคัญ

4. **Testing**:
   - ตรวจสอบ build errors
   - รัน tests ที่เกี่ยวข้อง
   - ทดสอบ manual ถ้าจำเป็น

5. **Commit Format**:
   ```
   [type]: [Brief description]

   - What: [Specific changes]
   - Why: [Motivation]
   - Impact: [What this affects]

   Closes #[issue-number]
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

6. **Complete**:
   - Push changes: `git push origin [branch]`
   - Create PR if needed
   - Close the plan issue

## Tips
- ทำทีละ phase อย่ารีบ
- Test บ่อยๆ
- ถามถ้าแผนไม่ชัดเจน
- ดู CLAUDE.md สำหรับ patterns และ best practices
