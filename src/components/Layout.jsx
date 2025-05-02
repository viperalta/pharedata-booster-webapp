import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Breadcrumbs } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';

const drawerWidth = 240;

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // <<-- NUEVO

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Convertir la ruta actual en texto capitalizado
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#0a0a0a',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Izquierda */}
          <Box display="flex" alignItems="center">
            {/* Botón hamburguesa en mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Breadcrumb dinámico */}
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              {pathSegments.map((segment, index) => (
                <Typography key={index} color="gray">
                  {capitalize(segment)}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>

          {/* Derecha */}
          <Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: '#111827',
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#0a0a0a',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
