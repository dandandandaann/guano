import { describe, it, expect } from 'vitest';
import { calculatePitDepth, GRAVITY, SPEED_OF_SOUND } from './logic';

describe('Abismo Calculator - Logic', () => {
  describe('GRAVITY constant', () => {
    it('should equal 9.80665 m/s²', () => {
      expect(GRAVITY).toBe(9.80665);
    });
  });

  describe('SPEED_OF_SOUND constant', () => {
    it('should equal 343 m/s', () => {
      expect(SPEED_OF_SOUND).toBe(343);
    });
  });

  describe('calculatePitDepth', () => {
    // Reference values computed from:
    //   depth = (c² / (2*g)) * (sqrt(1 + (2*g*t)/c) - 1)² - h
    // with c = 343, g = 9.80665

    describe('valid calculations', () => {
      it('should return 0 when time and release height are both 0', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1) - 1)² - 0 = 0
        const result = calculatePitDepth(0, 0);
        expect(result).toBe(0);
      });

      it('should return the negated release height when time is 0', () => {
        // With t = 0 the formula reduces to -h, indicating that with no
        // elapsed time the only "depth" implied by the model is the
        // (negative of the) release height offset.
        const result = calculatePitDepth(0, 1.5);
        expect(result).toBeCloseTo(-1.5, 10);
      });

      it('should calculate correct depth for 1 second elapsed with 1.5m release height', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1 + (2*9.80665*1)/343) - 1)² - 1.5
        //      ≈ 5998.858... * (sqrt(1.057186...) - 1)² - 1.5
        //      ≈ 3.2679528088829644
        const result = calculatePitDepth(1, 1.5);
        expect(result).toBeCloseTo(3.2679528088829644, 10);
      });

      it('should calculate correct depth for 2 seconds elapsed with 1.5m release height', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1 + (2*9.80665*2)/343) - 1)² - 1.5
        //      ≈ 17.066030234275228
        const result = calculatePitDepth(2, 1.5);
        expect(result).toBeCloseTo(17.066030234275228, 10);
      });

      it('should calculate correct depth when dropping from ground level (0m release)', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1 + (2*9.80665*2)/343) - 1)² - 0
        //      ≈ 18.566030234275228
        const result = calculatePitDepth(2, 0);
        expect(result).toBeCloseTo(18.566030234275228, 10);
      });
    });

    describe('edge cases', () => {
      it('should handle very small time values', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1 + (2*9.80665*0.001)/343) - 1)² - 1.5
        //      ≈ -1.499995096815185
        const result = calculatePitDepth(0.001, 1.5);
        expect(result).toBeCloseTo(-1.499995096815185, 10);
      });

      it('should handle large time values', () => {
        // depth = (343² / (2*9.80665)) * (sqrt(1 + (2*9.80665*10)/343) - 1)² - 1.5
        //      ≈ 384.6449605157748
        const result = calculatePitDepth(10, 1.5);
        expect(result).toBeCloseTo(384.6449605157748, 10);
      });

      it('should decrease when release height increases for the same time', () => {
        const shallow = calculatePitDepth(2, 0);
        const deeper = calculatePitDepth(2, 1.5);
        expect(deeper).toBeLessThan(shallow);
        expect(shallow - deeper).toBeCloseTo(1.5, 10);
      });

      it('should increase monotonically with time for a fixed release height', () => {
        const a = calculatePitDepth(1, 1.5);
        const b = calculatePitDepth(2, 1.5);
        const c = calculatePitDepth(5, 1.5);
        expect(b).toBeGreaterThan(a);
        expect(c).toBeGreaterThan(b);
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
