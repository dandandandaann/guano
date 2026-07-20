/**
 * Abismo Calculator - Core Business Logic
 *
 * This module contains pure functions for calculating pit depth based on
 * the physics of a free-falling object and the time for the impact sound
 * to travel back up to the observer.
 *
 * Formula:
 *   depth = (c² / (2 * g)) * (sqrt(1 + (2 * g * t) / c) - 1)² - h
 *
 * The closed-form expression is the positive root of:
 *   t = sqrt(2 * (depth + h) / g) + depth / c
 *
 * where the first term is the free-fall time of the rock from the release
 * height down to the bottom of the pit, and the second term is the time
 * the sound takes to travel back up from the bottom to the release point.
 *
 * Units:
 * - GRAVITY: meters per second squared (m/s²)
 * - SPEED_OF_SOUND: meters per second (m/s)
 * - timeSeconds: seconds (s)
 * - releaseHeightMeters: meters (m)
 * - Return value: meters (m) — depth of the pit below ground level
 *
 * @module calculators/abismo/logic
 */

/**
 * Standard gravity constant for free-fall calculations.
 * Value is based on the standard gravity (g₀) defined by the International System.
 */
export const GRAVITY = 9.80665;

/**
 * Speed of sound in air used by the calculator.
 * Treated as a constant; temperature, humidity and other atmospheric effects
 * are intentionally ignored for simplicity.
 */
export const SPEED_OF_SOUND = 343;

/**
 * Calculates the depth of a pit below ground level based on the total
 * elapsed time from releasing a rock to hearing it reach the bottom.
 *
 * The input time includes both the fall time of the rock and the time the
 * sound takes to travel back up to the observer. The depth is recovered by
 * solving that relationship for the pit depth.
 *
 * The returned value represents the depth **below ground level**, i.e. the
 * length of the pit itself, not the total distance the rock travels.
 *
 * @param timeSeconds - Elapsed time in seconds from release to hearing the impact (must be >= 0)
 * @param releaseHeightMeters - Height in meters from ground level to the release point (must be >= 0)
 * @returns Depth of the pit below ground level, in meters
 * @throws RangeError if timeSeconds or releaseHeightMeters is negative
 * @throws TypeError if inputs are not finite numbers (NaN, Infinity, etc.)
 */
export function calculatePitDepth(
  timeSeconds: number,
  releaseHeightMeters: number,
): number {
  // Validate that inputs are finite numbers
  if (!Number.isFinite(timeSeconds)) {
    throw new TypeError(
      'O tempo deve ser um número válido (tempo deve ser maior ou igual a zero)',
    );
  }

  if (!Number.isFinite(releaseHeightMeters)) {
    throw new TypeError(
      'A altura deve ser um número válido (altura deve ser maior ou igual a zero)',
    );
  }

  // Validate non-negative constraints
  if (timeSeconds < 0) {
    throw new RangeError(
      'O tempo deve ser maior ou igual a zero (não pode ser negativo)',
    );
  }

  if (releaseHeightMeters < 0) {
    throw new RangeError(
      'A altura deve ser maior ou igual a zero (não pode ser negativa)',
    );
  }

  // Solve t = sqrt(2*(d+h)/g) + d/c for d (positive root).
  // depth = (c² / (2*g)) * (sqrt(1 + (2*g*t)/c) - 1)² - h
  const inner = Math.sqrt(1 + (2 * GRAVITY * timeSeconds) / SPEED_OF_SOUND);
  const bracket = inner - 1;
  const depth =
    ((SPEED_OF_SOUND * SPEED_OF_SOUND) / (2 * GRAVITY)) * bracket * bracket -
    releaseHeightMeters;

  return depth;
}
