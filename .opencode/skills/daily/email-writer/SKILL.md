---
name: email-writer
description: Write professional emails in any tone
license: MIT
compatibility: opencode
metadata:
  audience: general
  use_case: communication
---

## Purpose

Write professional emails in various tones (formal, casual, persuasive, apologetic). Structure emails for maximum clarity and appropriate call-to-action.

## Prompt Template

Write an email with these specifications:

**Purpose**: {email_purpose}
**Tone**: {tone} (formal/casual/persuasive/friendly/apologetic)
**Recipient**: {recipient_role}
**Context**: {brief_context}

**Key Points to Include**:
{key_points}

**Desired Action**: {call_to_action}

**Length**: {length} (brief/concise/detailed)

Structure:
1. Clear subject line
2. Appropriate greeting
3. Purpose/opening statement
4. Supporting details
5. Call to action
6. Professional closing

## Example Usage

```
skill({ name: "email-writer" })
```

Ask: "Write a formal email to my professor requesting an extension on an assignment due to health issues."