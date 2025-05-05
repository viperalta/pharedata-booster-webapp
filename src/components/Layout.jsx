import { Box, CssBaseline, AppBar, Toolbar, Typography, IconButton, Breadcrumbs, Popper, Paper, List, ListItem, ListItemText, Divider, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import { Chip } from '@mui/material';

const drawerWidth = 240;

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [openPopper, setOpenPopper] = useState(false);
  const anchorRef = useRef(null);
  const timeoutRef = useRef(null);

  // Array de notificaciones ahora con campo "new"
  const notifications = [
    { id: 1, title: 'Notificación 1: esta notificacion va a ser larga para ver como se ve un texto de 2 lineas.', new: true },
    { id: 2, title: 'Notificación 2', new: true },
    { id: 3, title: 'Notificación 3', new: false },
    { id: 4, title: 'Notificación 4', new: false },
    { id: 5, title: 'Notificación 5', new: false },
    { id: 6, title: 'Notificación 6', new: false },
    { id: 7, title: 'Notificación 7', new: false },
    { id: 8, title: 'Notificación 8', new: false },
    { id: 9, title: 'Notificación 9', new: false },
    { id: 10, title: 'Notificación 10', new: false },
  ];

  // Contar las notificaciones nuevas
  const newNotificationsCount = notifications.filter((n) => n.new).length;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenPopper(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenPopper(false);
    }, 100);
  };

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
              <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </RouterLink>
              {pathSegments.map((segment, index) => (
                <Typography key={index} color="gray">
                  {capitalize(segment)}
                </Typography>
              ))}
            </Breadcrumbs>
          </Box>

          {/* Derecha */}
          <Box display="flex" alignItems="center" gap={2}>
            {/* Créditos disponibles */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                paddingX: 2,
                paddingY: 0.5,
                border: '1px solid #3b82f6',
                borderRadius: '12px',
                backgroundColor: '#1e293b',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 400,
              }}
            >
              <Box component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>
                2
              </Box>
              créditos disponibles
            </Box>

            {/* Notificaciones */}
            <Box
              ref={anchorRef}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              sx={{ position: 'relative' }}
            >
              <IconButton color="inherit">
                <Badge
                  badgeContent={newNotificationsCount}
                  color="error"
                  invisible={newNotificationsCount === 0}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.65rem',
                      height: 18,
                      minWidth: 18,
                      padding: '0 4px',
                      backgroundColor: '#ef4444',
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Popper
                open={openPopper}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                disablePortal
                modifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 10],
                    },
                  },
                ]}
              >
                <Paper
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  sx={{
                    mt: 1,
                    backgroundColor: '#1e293b',
                    color: 'white',
                    width: 300,
                    borderRadius: 2,
                    boxShadow: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Listado scrolleable */}
                  <Box sx={{ maxHeight: 256, overflowY: 'auto' }}>
                    <List dense>
                      {notifications.map((notif) => (
                        <ListItem
                          key={notif.id}
                          component={RouterLink}
                          to={`/notificaciones/${notif.id}`}
                          sx={{
                            borderBottom: '1px solid #334155',
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': {
                              backgroundColor: '#334155',
                              cursor: 'pointer',
                            },
                          }}
                        >
                          <ListItemText primary={notif.title} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Divider sx={{ backgroundColor: '#334155' }} />

                  {/* Enlace Ver Notificaciones */}
                  <Box
                    component={RouterLink}
                    to="/notificaciones"
                    sx={{
                      textAlign: 'center',
                      py: 1.5,
                      color: 'white',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      '&:hover': {
                        textDecoration: 'underline',
                        backgroundColor: '#334155',
                      },
                    }}
                  >
                    Ver notificaciones
                  </Box>
                </Paper>
              </Popper>
            </Box>
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
