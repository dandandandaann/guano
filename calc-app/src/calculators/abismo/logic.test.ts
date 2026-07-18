import { describe, it, expect } from 'vitest';
import { calculatePitDepth, GRAVITY } from './logic';

describe('Abismo Calculator - Logic', () => {
  describe('GRAVITY constant', () => {
    it('should equal 9.80665 m/s²', () => {
      expect(GRAVITY).toBe(9.80665);
    });
  });

  describe('calculatePitDepth', () => {
    describe('valid calculations', () => {
      it('should return release height only when time is 0 (no fall time)', () => {
        // When time = 0, there is no additional depth from falling
        // So the result should just be the release height
        const result = calculatePitDepth(0, 1.5);
        expect(result).toBe(1.5);
      });

      it('should calculate correct depth for 1 second fall with 1.5m release height', () => {
        // depth = releaseHeight + 0.5 * g * t²
        // depth = 1.5 + 0.5 * 9.80665 * 1²
        // depth = 1.5 + 4.903325
        // depth = 6.403325
        const result = calculatePitDepth(1, 1.5);
        expect(result).toBeCloseTo(6.403325, 6);
      });

      it('should calculate correct depth for 2 seconds fall with 1.5m release height', () => {
        // depth = releaseHeight + 0.5 * g * t²
        // depth = 1.5 + 0.5 * 9.80665 * 2²
        // depth = 1.5 + 0.5 * 9.80665 * 4
        // depth = 1.5 + 19.6133
        // depth = 21.1133
        const result = calculatePitDepth(2, 1.5);
        expect(result).toBeCloseTo(21.1133, 4);
      });

      it('should calculate correct depth when dropping from ground level (0m release)', () => {
        // depth = 0 + 0.5 * g * t²
        // depth = 0.5 * 9.80665 * 2²
        // depth = 0.5 * 9.80665 * 4
        // depth = 19.6133
        const result = calculatePitDepth(2, 0);
        expect(result).toBeCloseTo(19.6133, 4);
      });
    });

    describe('edge cases', () => {
      it('should return 0 when both time and release height are 0', () => {
        const result = calculatePitDepth(0, 0);
        expect(result).toBe(0);
      });

      it('should handle very small time values', () => {
        const result = calculatePitDepth(0.001, 1.5);
        // depth = 1.5 + 0.5 * 9.80665 * 0.000001
        // depth = 1.5 + 0.000004903325
        // depth ≈ 1.5000049
        expect(result).toBeCloseTo(1.500004903325, 10);
      });

      it('should handle large time values', () => {
        const result = calculatePitDepth(10, 1.5);
        // depth = 1.5 + 0.5 * 9.80665 * 100
        // depth = 1.5 + 490.3325
        // depth = 491.8325
        expect(result).toBeCloseTo(491.8325, 4);
      });
    });

    describe('validation - negative values', () => {
      it('should throw RangeError for negative time', () => {
        expect(() => calculatePitDepth(-1, 1.5)).toThrow(RangeError);
        expect(() => calculatePitDepth(-1, 1.5)).toThrow(
          'O tempo deve ser maior ou igual a zero',
        );
      });

      it('should throw RangeError for negative release height', () => {
        expect(() => calculatePitDepth(1, -1)).toThrow(RangeError);
        expect(() => calculatePitDepth(1, -1)).toThrow(
          'A altura deve ser maior ou igual a zero',
        );
      });

      it('should throw RangeError for negative time and height', () => {
        expect(() => calculatePitDepth(-5, -10)).toThrow(RangeError);
        // Should fail on time first
        expect(() => calculatePitDepth(-5, -10)).toThrow(
          'O tempo deve ser maior ou igual a zero',
        );
      });
    });

    describe('validation - non-finite values', () => {
      it('should throw TypeError for NaN time', () => {
        expect(() => calculatePitDepth(NaN, 1.5)).toThrow(TypeError);
        expect(() => calculatePitDepth(NaN, 1.5)).toThrow(
          'O tempo deve ser um número válido',
        );
      });

      it('should throw TypeError for NaN release height', () => {
        expect(() => calculatePitDepth(1, NaN)).toThrow(TypeError);
        expect(() => calculatePitDepth(1, NaN)).toThrow(
          'A altura deve ser um número válido',
        );
      });

      it('should throw TypeError for Infinity time', () => {
        expect(() => calculatePitDepth(Infinity, 1.5)).toThrow(TypeError);
      });

      it('should throw TypeError for -Infinity time', () => {
        expect(() => calculatePitDepth(-Infinity, 1.5)).toThrow(TypeError);
      });

      it('should throw TypeError for Infinity release height', () => {
        expect(() => calculatePitDepth(1, Infinity)).toThrow(TypeError);
      });

      it('should throw TypeError when both inputs are NaN', () => {
        expect(() => calculatePitDepth(NaN, NaN)).toThrow(TypeError);
      });
    });

    describe('validation - non-number inputs', () => {
      it('should throw TypeError for null time', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth(null as any, 1.5)).toThrow(TypeError);
      });

      it('should throw TypeError for undefined time', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth(undefined as any, 1.5)).toThrow(
          TypeError,
        );
      });

      it('should throw TypeError for string time', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth('1' as any, 1.5)).toThrow(TypeError);
      });

      it('should throw TypeError for null release height', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth(1, null as any)).toThrow(TypeError);
      });

      it('should throw TypeError for undefined release height', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth(1, undefined as any)).toThrow(TypeError);
      });

      it('should throw TypeError for string release height', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => calculatePitDepth(1, '1.5' as any)).toThrow(TypeError);
      });
    });
  });
});
