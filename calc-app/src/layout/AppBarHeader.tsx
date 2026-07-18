import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppBarHeaderProps {
  onMobileMenuClick?: () => void;
  showMobileMenuButton?: boolean;
}

export function AppBarHeader({ onMobileMenuClick, showMobileMenuButton }: AppBarHeaderProps) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {showMobileMenuButton && (
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={onMobileMenuClick}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>
          Calculadoras de Engenharia
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
