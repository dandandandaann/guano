# Requirements

## Project Overview

This application is a collection of engineering and utility calculators designed primarily for mobile devices.

The application must:

- Work completely offline after the first visit.
- Be deployable as a static website using GitHub Pages.
- Be easy to extend with additional calculators.
- Keep calculations deterministic and reproducible.
- Prioritize simplicity and maintainability over unnecessary abstractions.

---

## General Requirements

### Functional

- Display a permanent left navigation drawer.
- Allow navigation between calculators.
- Initially contain only one calculator:
  - Calculadora de Abismo
- Perform calculations only when the user clicks the **Calcular** button.
- Display validation errors before attempting a calculation.

### Non-functional

- Mobile-first design.
- Responsive layout.
- Offline support (PWA).
- Fast loading.
- No backend.
- No user accounts.
- No cloud storage.

---

## Localization

Internal source code must be written in English.

All user-visible content must be written in Brazilian Portuguese.

---

## Units

The application uses only the metric system.

Distance:
- meters (m)

Time:
- seconds (s)

No unit conversion is required.

---

# Calculadora de Abismo

## Purpose

Estimate the total depth of a pit based on the elapsed time between releasing a rock and hearing it reach the bottom.

## Inputs

### Time

Label:

Tempo para a pedra atingir o fundo (segundos)

Requirements:

- Required
- Numeric
- Greater than zero

### Release Height

Label:

Altura de onde a pedra foi solta (metros)

Default:

1.5

Requirements:

- Required
- Numeric
- Greater than or equal to zero

---

## Output

Display:

Profundidade estimada

The result must be shown in meters with two decimal places.

---

## Business Rules

Assumptions:

- Initial velocity = 0
- Gravity = 9.80665 m/s²
- Ignore air resistance

The release height is measured from the ground outside the pit to the point where the rock is released.

The displayed result is the estimated total depth of the pit.

---

## Future Growth

The application should support additional calculators without requiring changes to existing calculator implementations.