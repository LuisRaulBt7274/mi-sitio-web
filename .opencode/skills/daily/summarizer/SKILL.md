---
name: summarizer
description: Summarize documents, articles or conversation threads
license: MIT
compatibility: opencode
metadata:
  audience: general
  use_case: comprehension
---

## Purpose

Condense long documents, articles, meeting notes, or conversation threads into clear, actionable summaries. Extract key points, action items, and important details.

## Prompt Template

Summarize the following content:

**Type**: {content_type} (article/meeting-notes/thread/document/email-chain)
**Length Desired**: {summary_length} (bullet points/paragraph/one-sentence)

**Content**:
{content_to_summarize}

Focus on:
1. Main ideas and arguments
2. Key decisions made
3. Action items with owners
4. Important dates/deadlines
5. Unresolved questions

Format output as {output_format} (bulleted list/paragraphs/table).

## Example Usage

```
skill({ name: "summarizer" })
```

Ask: "Summarize this 5-page research paper into 5 bullet points highlighting the main findings and methodology."