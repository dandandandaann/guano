import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { calculators } from '@/calculators';
import { getIcon } from '@/components/iconMap';

export interface NavDrawerProps {
  variant: 'permanent' | 'temporary';
  open?: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
  width?: number;
}

export function NavDrawer({ variant, open = true, onClose, onNavigate, width = 240 }: NavDrawerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavItemClick = () => {
    if (onNavigate) {
      onNavigate();
    } else if (onClose && variant === 'temporary') {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ pt: 8 }}>
      <List>
        {calculators.length === 0 ? (
          <ListItemButton disabled sx={{ pl: 2 }}>
            <ListItemText primary="Nenhuma calculadora disponível ainda" />
          </ListItemButton>
        ) : (
          calculators.map((calculator) => {
            const Icon = getIcon(calculator.icon);
            const isActive = location.pathname === calculator.path;

            return (
              <ListItemButton
                key={calculator.id}
                component="a"
                href={calculator.path}
                selected={isActive}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(calculator.path);
                  handleNavItemClick();
                }}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={calculator.name} />
              </ListItemButton>
            );
          })
        )}
      </List>
    </Box>
  );

  if (variant === 'permanent') {
    return (
      <Box
        component="nav"
        aria-label="navegação principal"
        sx={{
          width: width,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {drawerContent}
      </Box>
    );
  }

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
