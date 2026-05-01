---
name: essay-writer
description: Structure and write academic essays
license: MIT
compatibility: opencode
metadata:
  audience: students
  use_case: academic
---

## Purpose

Structure and write academic essays with proper thesis statements, evidence-based arguments, and scholarly tone. Follow essay structure (introduction, body, conclusion) with proper citations.

## Prompt Template

Write an academic essay on:

**Topic**: {essay_topic}
**Word Count**: {word_count} words
**Academic Level**: {academic_level} (high school/undergraduate/graduate)
**Citation Style**: {citation_style} (APA/MLA/Chicago/Harvard)

**Thesis Statement** (or let me suggest one):
{thesis_statement}

**Key Arguments**:
{key_arguments}

Structure required:
1. **Introduction** - Hook, background, thesis, roadmap
2. **Body Paragraphs** - Topic sentence, evidence, analysis, transition
3. **Counter-arguments** - Acknowledge opposition, rebut
4. **Conclusion** - Restate thesis, synthesize, final thought

Include in-text citations and references.

## Example Usage

```
skill({ name: "essay-writer" })
```

Ask: "Write a 1000-word essay on the impact of social media on academic performance, using APA citations."