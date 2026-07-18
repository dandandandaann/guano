import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Link } from '@mui/material';
import { AppBarHeader } from './AppBarHeader';
import { NavDrawer } from './NavDrawer';

const DRAWER_WIDTH = 240;

export function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <Link
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 9999,
          '&:focus': {
            left: 2,
            top: 2,
            padding: 2,
            backgroundColor: 'background.paper',
            borderRadius: 1,
            boxShadow: 2,
          },
        }}
      >
        Pular para o conteúdo principal
      </Link>
      <AppBarHeader
        showMobileMenuButton={!isDesktop}
        onMobileMenuClick={handleMobileMenuClick}
      />
      <Box sx={{ display: 'flex' }}>
        {isDesktop ? (
          <NavDrawer variant="permanent" open width={DRAWER_WIDTH} />
        ) : (
          <NavDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleMobileClose}
            onNavigate={handleMobileClose}
            width={DRAWER_WIDTH}
          />
        )}
        <Box
          component="main"
          id="main-content"
          tabIndex={-1}
          sx={{
            flexGrow: 1,
            width: 'auto',
            pt: 8,
            px: 2,
            pb: 4,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
