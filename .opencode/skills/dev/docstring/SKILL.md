---
name: docstring
description: Generate documentation and inline code comments
license: MIT
compatibility: opencode
metadata:
  audience: developers
  use_case: documentation
---

## Purpose

Generate comprehensive documentation including JSDoc/TSDoc comments, README files, and inline comments. Follow standard documentation patterns for the target language and framework.

## Prompt Template

Generate documentation for:

**Code**:
```
{code_snippet}
```

**Documentation Type**:
{doc_type} (JSDoc/README/inline comments/API docs)

**Language/Framework**:
{language} - {framework}

Include:

1. **Function/Class Documentation**:
   - Purpose description
   - Parameter descriptions with types
   - Return value with type
   - Throws/exceptions
   - Example usage

2. **Inline Comments**:
   - Explain "why" not "what"
   - Document complex logic
   - Note non-obvious assumptions

3. **README Sections** (if applicable):
   - Installation
   - Usage examples
   - API reference
   - Contributing guidelines

Follow {documentation_standard} standards (JSDoc/TSDoc/Google/NumPy).

## Example Usage

```
skill({ name: "docstring" })
```

Ask: "Generate TSDoc documentation for this utility function that handles date formatting."