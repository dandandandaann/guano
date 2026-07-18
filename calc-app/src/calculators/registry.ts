import type { CalculatorMeta } from '@/types/calculator';

/**
 * Registry of all available calculators.
 * Add new calculators here when implementing them.
 */
export const calculators: CalculatorMeta[] = [
  {
    id: 'abismo',
    name: 'Calculadora de Abismo',
    description:
      'Estima a profundidade de um abismo a partir do tempo de queda de uma pedra.',
    path: '/calculadora-de-abismo',
    icon: 'Calculate',
  },
];

/**
 * Retrieves a calculator by its unique id.
 * @param id - The calculator's id slug
 * @returns The calculator metadata or undefined if not found
 */
export function getCalculatorById(id: string): CalculatorMeta | undefined {
  return calculators.find((calc) => calc.id === id);
}

/**
 * Retrieves a calculator by its route path.
 * @param path - The calculator's route path
 * @returns The calculator metadata or undefined if not found
 */
export function getCalculatorByPath(path: string): CalculatorMeta | undefined {
  return calculators.find((calc) => calc.path === path);
}
