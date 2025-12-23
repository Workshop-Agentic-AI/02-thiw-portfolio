---
description: Smart planning - Create detailed implementation plan
argument-hint: "[issue number]"
---

# Smart Planning (nnn)

วิเคราะห์และสร้างแผน implementation อย่างละเอียด

**สำคัญ**: นี่คือการวางแผนเท่านั้น - ไม่ต้องเขียนโค้ด

## Instructions

1. **Check for Recent Context**:
   - ดู context issues ล่าสุด (จาก `/ccc`)
   - ถ้าไม่มี ให้แนะนำ user รัน `/ccc` ก่อน

2. **Deep Analysis** (Research & understand):
   - อ่าน context issue หรือ issue ที่ระบุ
   - วิเคราะห์ codebase ปัจจุบัน
   - ศึกษา patterns และ conventions ที่มีอยู่
   - ระบุ components ที่จะได้รับผลกระทบ

3. **Create Plan Issue** ด้วย:
   - **Title**: `plan: [Feature/Fix name]`

   **Body Template**:
   ```markdown
   ## Overview
   [Brief description of what needs to be done]

   ## Current State
   [What exists now]

   ## Research Findings
   - Pattern 1 discovered
   - Pattern 2 discovered

   ## Proposed Solution
   [Overview of the approach]

   ## Implementation Steps

   ### Phase 1: [Short description] (~X min)
   - [ ] Step 1.1
   - [ ] Step 1.2
   - [ ] Step 1.3

   ### Phase 2: [Short description] (~X min)
   - [ ] Step 2.1
   - [ ] Step 2.2

   ## Files to Modify
   - `path/to/file1`
   - `path/to/file2`

   ## Risks & Mitigations
   | Risk | Mitigation |
   |------|------------|
   | Risk 1 | Strategy 1 |

   ## Success Criteria
   - [ ] Criterion 1
   - [ ] Criterion 2

   ## Estimated Time
   ~XX minutes
   ```

4. **Provide Summary**: สรุปสั้นๆ ว่าวิเคราะห์อะไรบ้าง และ issue number ที่สร้าง

## Tips
- แบ่ง complex problems เป็น phases (ควรทำได้ใน 1 ชั่วโมง)
- Focus on what, why, และ success criteria
