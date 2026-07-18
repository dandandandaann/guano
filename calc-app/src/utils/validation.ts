/**
 * Validation utilities for calculator inputs.
 * All error messages are in Brazilian Portuguese as per project localization requirements.
 */

/**
 * Result type for validation operations.
 * Returns valid=true on success, or valid=false with a map of field errors on failure.
 */
export type ValidationResult =
  | { valid: true }
  | { valid: false; errors: Record<string, string> };

/**
 * Checks if a string value is present (non-empty after trimming whitespace).
 * @param value - The string to check
 * @returns true if the value is non-empty after trimming, false otherwise
 */
export function isPresent(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Checks if a string can be parsed as a finite number.
 * Rejects NaN and Infinity values.
 * @param value - The string to check
 * @returns true if the value parses to a finite number, false otherwise
 */
export function isNumeric(value: string): boolean {
  const parsed = Number(value);
  return !Number.isNaN(parsed) && Number.isFinite(parsed);
}

/**
 * Checks if a number is strictly positive (greater than zero).
 * @param value - The number to check
 * @returns true if the value is strictly greater than 0, false otherwise
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Checks if a number is non-negative (greater than or equal to zero).
 * @param value - The number to check
 * @returns true if the value is greater than or equal to 0, false otherwise
 */
export function isNonNegative(value: number): boolean {
  return value >= 0;
}

/**
 * Options for validating a number input field.
 */
export interface NumberInputValidationOptions {
  /** If true, the field must be present (non-empty after trim). Default: false */
  required?: boolean;
  /** Minimum constraint: 'positive' requires > 0, 'non-negative' requires >= 0 */
  min?: 'positive' | 'non-negative';
}

/**
 * Validates a number input field with various constraints.
 * Returns null if valid, or a Portuguese error message string if invalid.
 *
 * @param raw - The raw string input to validate
 * @param fieldName - The display name of the field (used in error messages)
 * @param options - Validation options (required, min constraint)
 * @returns null if valid, otherwise a Portuguese error message
 */
export function validateNumberInput(
  raw: string,
  fieldName: string,
  options: NumberInputValidationOptions = {},
): string | null {
  const { required = false, min } = options;

  // Check required
  if (required && !isPresent(raw)) {
    return `O campo ${fieldName} é obrigatório`;
  }

  // If not required and empty, it's valid
  if (!required && !isPresent(raw)) {
    return null;
  }

  // Check numeric
  if (!isNumeric(raw)) {
    return `O campo ${fieldName} deve ser um número válido`;
  }

  // Parse the number for min constraint checks
  const parsed = Number(raw);

  // Check min constraint
  if (min === 'positive' && !isPositive(parsed)) {
    return `O campo ${fieldName} deve ser maior que zero`;
  }

  if (min === 'non-negative' && !isNonNegative(parsed)) {
    return `O campo ${fieldName} não pode ser negativo`;
  }

  return null;
}

/**
 * Validates inputs for the Abismo (pit depth) calculator.
 * Time must be required, numeric, and strictly positive (> 0).
 * Height must be required, numeric, and non-negative (>= 0).
 *
 * @param rawTime - The raw string input for time (Tempo)
 * @param rawHeight - The raw string input for height (Altura)
 * @returns ValidationResult indicating success or a map of field errors
 */
export function validateAbismoInputs(
  rawTime: string,
  rawHeight: string,
): ValidationResult {
  const errors: Record<string, string> = {};

  const timeError = validateNumberInput(rawTime, 'Tempo', {
    required: true,
    min: 'positive',
  });
  if (timeError !== null) {
    errors.time = timeError;
  }

  const heightError = validateNumberInput(rawHeight, 'Altura', {
    required: true,
    min: 'non-negative',
  });
  if (heightError !== null) {
    errors.height = heightError;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
}
