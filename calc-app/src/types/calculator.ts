/**
 * Metadata describing a calculator available in the application.
 * This interface serves as the single source of truth for calculator metadata.
 */
export interface CalculatorMeta {
  /** Unique slug identifier, e.g., 'abismo' */
  id: string;
  /** Portuguese display name, e.g., 'Calculadora de Abismo' */
  name: string;
  /** Short Portuguese description, 1-2 sentences */
  description: string;
  /** Route path, e.g., '/calculadora-de-abismo' */
  path: string;
  /** MUI icon name as string, e.g., 'Calculate' */
  icon: string;
}
