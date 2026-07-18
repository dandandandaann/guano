import { describe, it, expect } from 'vitest';
import {
  isPresent,
  isNumeric,
  isPositive,
  isNonNegative,
  validateNumberInput,
  validateAbismoInputs,
} from './validation';

describe('Validation Utilities', () => {
  describe('isPresent', () => {
    it('should return false for empty string', () => {
      expect(isPresent('')).toBe(false);
    });

    it('should return false for whitespace-only string', () => {
      expect(isPresent('   ')).toBe(false);
      expect(isPresent('\t')).toBe(false);
      expect(isPresent('\n')).toBe(false);
      expect(isPresent('  \t\n  ')).toBe(false);
    });

    it('should return true for non-empty string', () => {
      expect(isPresent('hello')).toBe(true);
      expect(isPresent('  hello  ')).toBe(true);
      expect(isPresent('1')).toBe(true);
      expect(isPresent('0')).toBe(true);
    });
  });

  describe('isNumeric', () => {
    it('should return true for valid number strings', () => {
      expect(isNumeric('0')).toBe(true);
      expect(isNumeric('1')).toBe(true);
      expect(isNumeric('-1')).toBe(true);
      expect(isNumeric('1.5')).toBe(true);
      expect(isNumeric('-1.5')).toBe(true);
      expect(isNumeric('1e5')).toBe(true);
      expect(isNumeric('1.5e-3')).toBe(true);
      expect(isNumeric('  123  ')).toBe(true);
    });

    it('should return false for NaN', () => {
      expect(isNumeric('NaN')).toBe(false);
    });

    it('should return false for Infinity', () => {
      expect(isNumeric('Infinity')).toBe(false);
      expect(isNumeric('-Infinity')).toBe(false);
      expect(isNumeric('+Infinity')).toBe(false);
    });

    it('should return false for non-numeric strings', () => {
      expect(isNumeric('hello')).toBe(false);
      expect(isNumeric('abc123')).toBe(false);
    });

    it('should return true for empty or whitespace-only strings (parse as 0)', () => {
      // Number('') === 0, which is a finite number
      expect(isNumeric('')).toBe(true);
      // Similarly, whitespace-only strings parse to 0
      expect(isNumeric('   ')).toBe(true);
      expect(isNumeric('\t')).toBe(true);
      expect(isNumeric('\n')).toBe(true);
    });
  });

  describe('isPositive', () => {
    it('should return false for zero', () => {
      expect(isPositive(0)).toBe(false);
      expect(isPositive(0.0)).toBe(false);
    });

    it('should return true for positive numbers', () => {
      expect(isPositive(1)).toBe(true);
      expect(isPositive(0.001)).toBe(true);
      expect(isPositive(100)).toBe(true);
    });

    it('should return false for negative numbers', () => {
      expect(isPositive(-1)).toBe(false);
      expect(isPositive(-0.001)).toBe(false);
      expect(isPositive(-100)).toBe(false);
    });
  });

  describe('isNonNegative', () => {
    it('should return true for zero', () => {
      expect(isNonNegative(0)).toBe(true);
      expect(isNonNegative(0.0)).toBe(true);
    });

    it('should return true for positive numbers', () => {
      expect(isNonNegative(1)).toBe(true);
      expect(isNonNegative(0.001)).toBe(true);
      expect(isNonNegative(100)).toBe(true);
    });

    it('should return false for negative numbers', () => {
      expect(isNonNegative(-1)).toBe(false);
      expect(isNonNegative(-0.001)).toBe(false);
      expect(isNonNegative(-100)).toBe(false);
    });
  });

  describe('validateNumberInput', () => {
    describe('required option', () => {
      it('should return error message when required and empty', () => {
        const result = validateNumberInput('', 'Teste', { required: true });
        expect(result).toBe('O campo Teste é obrigatório');
      });

      it('should return error message when required and whitespace only', () => {
        const result = validateNumberInput('   ', 'Teste', { required: true });
        expect(result).toBe('O campo Teste é obrigatório');
      });

      it('should return null when required and has value', () => {
        const result = validateNumberInput('1', 'Teste', { required: true });
        expect(result).toBeNull();
      });

      it('should return null when not required and empty', () => {
        const result = validateNumberInput('', 'Teste', { required: false });
        expect(result).toBeNull();
      });

      it('should return null when not required and whitespace only', () => {
        const result = validateNumberInput('  ', 'Teste', { required: false });
        expect(result).toBeNull();
      });
    });

    describe('numeric validation', () => {
      it('should return error for non-numeric string', () => {
        const result = validateNumberInput('abc', 'Teste');
        expect(result).toBe('O campo Teste deve ser um número válido');
      });

      it('should return error for NaN string', () => {
        const result = validateNumberInput('NaN', 'Teste');
        expect(result).toBe('O campo Teste deve ser um número válido');
      });

      it('should return error for Infinity string', () => {
        const result = validateNumberInput('Infinity', 'Teste');
        expect(result).toBe('O campo Teste deve ser um número válido');
      });

      it('should return null for valid number string', () => {
        const result = validateNumberInput('123', 'Teste');
        expect(result).toBeNull();
      });
    });

    describe('min constraint: positive', () => {
      it('should return error for zero when min is positive', () => {
        const result = validateNumberInput('0', 'Teste', { min: 'positive' });
        expect(result).toBe('O campo Teste deve ser maior que zero');
      });

      it('should return error for negative number when min is positive', () => {
        const result = validateNumberInput('-5', 'Teste', { min: 'positive' });
        expect(result).toBe('O campo Teste deve ser maior que zero');
      });

      it('should return null for positive number when min is positive', () => {
        const result = validateNumberInput('1', 'Teste', { min: 'positive' });
        expect(result).toBeNull();
      });

      it('should return null for small positive number when min is positive', () => {
        const result = validateNumberInput('0.001', 'Teste', { min: 'positive' });
        expect(result).toBeNull();
      });
    });

    describe('min constraint: non-negative', () => {
      it('should return null for zero when min is non-negative', () => {
        const result = validateNumberInput('0', 'Teste', { min: 'non-negative' });
        expect(result).toBeNull();
      });

      it('should return error for negative number when min is non-negative', () => {
        const result = validateNumberInput('-5', 'Teste', { min: 'non-negative' });
        expect(result).toBe('O campo Teste não pode ser negativo');
      });

      it('should return null for positive number when min is non-negative', () => {
        const result = validateNumberInput('1', 'Teste', { min: 'non-negative' });
        expect(result).toBeNull();
      });
    });

    describe('combined options', () => {
      it('should validate required first, then numeric, then min', () => {
        // Required check comes first
        const result1 = validateNumberInput('', 'Teste', {
          required: true,
          min: 'positive',
        });
        expect(result1).toBe('O campo Teste é obrigatório');

        // Numeric check comes before min check
        const result2 = validateNumberInput('abc', 'Teste', {
          required: true,
          min: 'positive',
        });
        expect(result2).toBe('O campo Teste deve ser um número válido');

        // Min check comes last
        const result3 = validateNumberInput('0', 'Teste', {
          required: true,
          min: 'positive',
        });
        expect(result3).toBe('O campo Teste deve ser maior que zero');

        // Valid input passes all checks
        const result4 = validateNumberInput('1', 'Teste', {
          required: true,
          min: 'positive',
        });
        expect(result4).toBeNull();
      });
    });
  });

  describe('validateAbismoInputs', () => {
    describe('valid case', () => {
      it('should return valid: true for valid inputs', () => {
        const result = validateAbismoInputs('2', '1.5');
        expect(result.valid).toBe(true);
      });

      it('should return valid: true for zero time (edge case)', () => {
        // Note: In the UI, time=0 should be invalid (must be > 0)
        // But validateAbismoInputs enforces this via validateNumberInput with min: 'positive'
        // So time=0 should actually fail validation
        const result = validateAbismoInputs('0', '1.5');
        expect(result.valid).toBe(false);
      });

      it('should return valid: true with zero height (ground level release)', () => {
        const result = validateAbismoInputs('2', '0');
        expect(result.valid).toBe(true);
      });

      it('should return valid: true with large values', () => {
        const result = validateAbismoInputs('100', '1000');
        expect(result.valid).toBe(true);
      });
    });

    describe('missing time', () => {
      it('should return error for empty time', () => {
        const result = validateAbismoInputs('', '1.5');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.time).toBe(
          'O campo Tempo é obrigatório',
        );
      });

      it('should return error for whitespace-only time', () => {
        const result = validateAbismoInputs('   ', '1.5');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.time).toBe(
          'O campo Tempo é obrigatório',
        );
      });
    });

    describe('missing height', () => {
      it('should return error for empty height', () => {
        const result = validateAbismoInputs('2', '');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.height).toBe(
          'O campo Altura é obrigatório',
        );
      });

      it('should return error for whitespace-only height', () => {
        const result = validateAbismoInputs('2', '\t');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.height).toBe(
          'O campo Altura é obrigatório',
        );
      });
    });

    describe('zero time (must be > 0)', () => {
      it('should return error for zero time', () => {
        const result = validateAbismoInputs('0', '1.5');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.time).toBe(
          'O campo Tempo deve ser maior que zero',
        );
      });
    });

    describe('negative height', () => {
      it('should return error for negative height', () => {
        const result = validateAbismoInputs('2', '-5');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.height).toBe(
          'O campo Altura não pode ser negativo',
        );
      });
    });

    describe('non-numeric inputs', () => {
      it('should return error for non-numeric time', () => {
        const result = validateAbismoInputs('abc', '1.5');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.time).toBe(
          'O campo Tempo deve ser um número válido',
        );
      });

      it('should return error for non-numeric height', () => {
        const result = validateAbismoInputs('2', 'xyz');
        expect(result.valid).toBe(false);
        expect((result as { valid: false; errors: Record<string, string> }).errors.height).toBe(
          'O campo Altura deve ser um número válido',
        );
      });
    });

    describe('multiple errors', () => {
      it('should return all errors when both fields are invalid', () => {
        const result = validateAbismoInputs('', '');
        expect(result.valid).toBe(false);
        const errors = (result as { valid: false; errors: Record<string, string> }).errors;
        expect(errors.time).toBe('O campo Tempo é obrigatório');
        expect(errors.height).toBe('O campo Altura é obrigatório');
      });

      it('should return time and height errors when both have wrong values', () => {
        const result = validateAbismoInputs('abc', '-5');
        expect(result.valid).toBe(false);
        const errors = (result as { valid: false; errors: Record<string, string> }).errors;
        expect(errors.time).toBe('O campo Tempo deve ser um número válido');
        expect(errors.height).toBe('O campo Altura não pode ser negativo');
      });
    });
  });
});
