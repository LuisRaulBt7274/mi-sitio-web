---
name: presentation
description: Create outlines for school presentations
license: MIT
compatibility: opencode
metadata:
  audience: students
  use_case: presentations
---

## Purpose

Create structured outlines for school presentations and oral reports. Design clear narratives with appropriate visuals and time management.

## Prompt Template

Create a presentation outline:

**Topic**: {presentation_topic}
**Duration**: {duration} minutes
**Audience**: {audience} (classmates/professors/mixed)
**Presentation Type**: {type} (oral-report/powerpoint/poster)

**Key Points to Cover**:
{key_points}

Structure the presentation:

1. **Opening** (10% of time)
   - Hook/attention grabber
   - Topic introduction
   - Preview of content

2. **Body** (80% of time)
   - Main point 1 with evidence
   - Main point 2 with evidence
   - Main point 3 with evidence

3. **Conclusion** (10% of time)
   - Summary
   - Key takeaway
   - Q&A prompt

Include suggested visual aids and talking points for each section.

## Example Usage

```
skill({ name: "presentation" })
```

Ask: "Create a 5-minute presentation outline on the water cycle for a middle school science class."