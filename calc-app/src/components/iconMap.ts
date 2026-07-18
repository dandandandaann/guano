import Calculate from '@mui/icons-material/Calculate';
import type { SvgIconComponent } from '@mui/icons-material';

/**
 * Map of icon names to MUI icon components.
 * Add new icons here when needed by calculators.
 */
const iconMap: Record<string, SvgIconComponent> = {
  Calculate,
};

/**
 * Retrieves an icon component by name.
 * Defaults to Calculate if the icon name is not found.
 * @param name - The icon name string from calculator metadata
 * @returns The MUI icon component
 */
export function getIcon(name: string): SvgIconComponent {
  return iconMap[name] ?? Calculate;
}
