---
name: code-review
description: Review code for bugs, performance issues and best practices
license: MIT
compatibility: opencode
metadata:
  audience: developers
  use_case: review
---

## Purpose

Perform comprehensive code reviews focusing on bug detection, performance optimization, security vulnerabilities, and adherence to best practices. Provide actionable feedback with severity levels and suggested fixes.

## Prompt Template

Review the following code for issues and improvements:

```
{code_snippet}
```

Focus on:

1. **Bugs and Logic Errors**:
   - Identify any bugs or logic errors
   - Check edge cases and boundary conditions

2. **Performance Issues**:
   - Look for O(n) complexity issues
   - Identify unnecessary re-renders or allocations
   - Check for proper memoization opportunities

3. **Security Vulnerabilities**:
   - SQL injection risks
   - XSS vulnerabilities
   - Authentication/authorization issues
   - Input validation

4. **Code Quality**:
   - Naming conventions
   - Function complexity (cyclomatic)
   - Duplication detection
   - Missing error handling

5. **Best Practices**:
   - Framework-specific patterns
   - Language idioms
   - Testing coverage gaps

Provide a structured report with severity (Critical/High/Medium/Low) and concrete fix suggestions.

## Example Usage

```
skill({ name: "code-review" })
```

Ask: "Review this React hook for memory leaks and race conditions."