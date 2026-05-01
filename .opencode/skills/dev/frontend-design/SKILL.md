---
name: frontend-design
description: Generate production-grade React/HTML/CSS UI components with accessibility and responsiveness
license: MIT
compatibility: opencode
metadata:
  audience: developers
  use_case: frontend
---

## Purpose

Generate clean, accessible, and responsive UI components using React, HTML, CSS, and Tailwind CSS. Focus on production-ready code with proper state management, accessibility (WCAG 2.1), and responsive design patterns.

## Prompt Template

Generate a {component_type} component for a React application with the following requirements:

- **Component Type**: {component_type}
- **Framework**: {framework} (React/Vue/HTML)
- **Styling**: {styling_method} (Tailwind/CSS Modules/styled-components)
- **Functionality**:
  {functionality_requirements}
- **Accessibility Requirements**:
  {accessibility_requirements}
- **Responsive Breakpoints**: {responsive_breakpoints} (mobile/tablet/desktop)
- **Props Interface**:
  {props_interface}

Make sure to:
1. Use functional components with proper TypeScript interfaces
2. Include proper ARIA labels and keyboard navigation
3. Handle loading, error, and empty states
4. Follow the existing design system tokens
5. Include proper TypeScript types

## Example Usage

```
skill({ name: "frontend-design" })
```

Then ask:
"Please generate a card component with image, title, description, and action button. Use Tailwind CSS, include hover animations, and ensure it's keyboard navigable."

Or with variables:
"Generate a data table component with sorting, filtering, and pagination. Use React, TypeScript, and follow WCAG accessibility guidelines."