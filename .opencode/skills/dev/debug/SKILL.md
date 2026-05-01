---
name: debug
description: Systematic debugging with root cause analysis
license: MIT
compatibility: opencode
metadata:
  audience: developers
  use_case: debugging
---

## Purpose

Debug issues systematically using root cause analysis (5 Whys, bisecting, logging strategies). Develop step-by-step debugging plans and identify the actual source of bugs rather than symptoms.

## Prompt Template

Debug the following issue:

**Error Message**:
```
{error_message}
```

**Stack Trace**:
```
{stack_trace}
```

**Relevant Code**:
```
{relevant_code_snippet}
```

**Environment**:
- Framework: {framework}
- Language: {language}
- OS: {os}

Apply systematic debugging:

1. **Reproduce** - Can you consistently reproduce the issue?
2. **Isolate** - Create minimal reproduction case
3. **Hypothesize** - Form testable hypotheses about root cause
4. **Verify** - Test each hypothesis
5. **Fix** - Apply minimal fix
6. **Verify Fix** - Confirm issue is resolved

Use appropriate tools: browser DevTools, logging, breakpoints, error boundary analysis.

## Example Usage

```
skill({ name: "debug" })
```

Ask: "Debug this React component that crashes with 'Cannot read property map of undefined'."