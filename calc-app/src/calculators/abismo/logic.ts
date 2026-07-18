/**
 * Abismo Calculator - Core Business Logic
 *
 * This module contains pure functions for calculating pit depth based on
 * the physics of a free-falling object.
 *
 * Formula: d = releaseHeightMeters + 0.5 * GRAVITY * timeSeconds²
 *
 * Units:
 * - GRAVITY: meters per second squared (m/s²)
 * - timeSeconds: seconds (s)
 * - releaseHeightMeters: meters (m)
 * - Return value: meters (m)
 *
 * @module calculators/abismo/logic
 */

/**
 * Standard gravity constant for free-fall calculations.
 * Value is based on the standard gravity (g₀) defined by the International System.
 */
export const GRAVITY = 9.80665;

/**
 * Calculates the total pit depth based on the time it takes for a rock
 * to fall from a release point to the bottom of the pit.
 *
 * The calculation uses the kinematic equation for free fall with initial
 * velocity = 0:
 *   depth = releaseHeight + 0.5 * g * t²
 *
 * Where:
 * - releaseHeight is the height from ground level to where the rock was released
 * - The falling time accounts for the rock traveling through the pit
 *
 * @param timeSeconds - Time in seconds from release to reaching the pit bottom (must be >= 0)
 * @param releaseHeightMeters - Height in meters from ground level to release point (must be >= 0)
 * @returns Total depth in meters from the release point to the pit bottom
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

  // Calculate total depth using the free-fall formula
  // depth = releaseHeight + 0.5 * g * t²
  const fallingDepth = 0.5 * GRAVITY * timeSeconds * timeSeconds;
  const totalDepth = releaseHeightMeters + fallingDepth;

  return totalDepth;
}
