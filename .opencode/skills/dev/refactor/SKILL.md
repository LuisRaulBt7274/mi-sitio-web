---
name: refactor
description: Refactor code for improved readability and maintainability
license: MIT
compatibility: opencode
metadata:
  audience: developers
  use_case: refactoring
---

## Purpose

Refactor existing code to improve readability, maintainability, and performance while preserving functionality. Focus on clean code principles, DRY (Don't Repeat Yourself), and proper abstraction patterns.

## Prompt Template

Refactor the following code:

```
{code_snippet}
```

Target improvements:

1. **Readability**:
   - Clear naming conventions
   - Proper function/variable names
   - Logical code organization

2. **Maintainability**:
   - Extract repeated logic into reusable functions
   - Reduce coupling
   - Increase cohesion

3. **Performance** (if applicable):
   - Remove unnecessary operations
   - Optimize data structures
   - Add proper memoization

4. **Patterns to Apply**:
   - Extract Method
   - Replace Conditional with Polymorphism
   - Introduce Parameter Object
   - Rename Variable to Obvious Intent
   - Split Loop

Output the refactored code with explanation of changes made.

## Example Usage

```
skill({ name: "refactor" })
```

Ask: "Refactor this nested callback hell into clean async/await with proper error handling."