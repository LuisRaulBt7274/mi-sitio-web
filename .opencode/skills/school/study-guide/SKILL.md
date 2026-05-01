---
name: study-guide
description: Create study guides from notes or textbooks
license: MIT
compatibility: opencode
metadata:
  audience: students
  use_case: learning
---

## Purpose

Transform raw notes or textbook content into structured study guides with key concepts, practice questions, and memory aids.

## Prompt Template

Create a study guide from:

**Source Material**: {source_material}
**Subject**: {subject}
**Target Audience**: {audience} (undergraduate/graduate/self-study)

**Important Topics to Cover**:
{topics_to_cover}

**Study Guide Format**:
{format_preference} (outline/mind-map/flash-cards/question-answer)

Include:
1. **Key Concepts** - 5-10 essential terms/definitions
2. **Important Formulas/Facts** - For STEM subjects
3. **Practice Questions** - With answer key
4. **Mnemonics** - Memory aids where helpful
5. **Common Mistakes** - Things to watch out for

Focus on high-yield information that appears on exams.

## Example Usage

```
skill({ name: "study-guide" })
```

Ask: "Create a study guide for organic chemistry reactions, including functional groups and reaction mechanisms."