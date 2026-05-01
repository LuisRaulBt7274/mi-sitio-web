---
name: translator
description: Translate and localize content naturally
license: MIT
compatibility: opencode
metadata:
  audience: general
  use_case: translation
---

## Purpose

Translate content between languages while preserving meaning, tone, and cultural nuances. Adapt idioms and ensure natural-sounding output.

## Prompt Template

Translate the following:

**Source Text**:
{text_to_translate}

**Source Language**: {source_language}
**Target Language**: {target_language}
**Tone**: {tone} (formal/casual/technical/literary)

**Context**: {translation_context} (business/academic/casual/creative)

Requirements:
1. Preserve original meaning accurately
2. Adapt idioms to natural target language equivalents
3. Maintain consistent terminology
4. Preserve formatting (Markdown, code blocks, etc.)
5. Adjust formality level if needed

Provide both translated text and brief notes on any adaptations made.

## Example Usage

```
skill({ name: "translator" })
```

Ask: "Translate this project proposal from English to Spanish, keeping it professional and suitable for a business context."