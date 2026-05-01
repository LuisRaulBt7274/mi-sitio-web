---
name: problem-solver
description: Solve math, science and logic problems step by step
license: MIT
compatibility: opencode
metadata:
  audience: students
  use_case: problem-solving
---

## Purpose

Solve mathematics, physics, chemistry, and logic problems with clear step-by-step reasoning. Show all work and explain the underlying concepts.

## Prompt Template

Solve the following problem:

**Problem**:
{problem_statement}

**Subject**: {subject} (math/physics/chemistry/logic/statistics)
**Difficulty**: {difficulty} (basic/intermediate/advanced)

**Given Information**:
{given_information}

**What to Find**:
{unknown_to_find}

Apply systematic approach:
1. **Identify knowns and unknowns**
2. **Select appropriate formula/principle**
3. **Solve showing all steps**
4. **Check units and reasonability**
5. **Final answer with units**

Explain each step and the reasoning behind it.

## Example Usage

```
skill({ name: "problem-solver" })
```

Ask: "Solve this calculus problem: Find the derivative of f(x) = x^3 + 2x^2 - 5x + 3"