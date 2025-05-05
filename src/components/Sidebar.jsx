import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Button,
    Avatar,
    IconButton,
  } from '@mui/material';
  import {
    Home as HomeIcon,
    BarChart as AnalyticsIcon,
    People as ClientsIcon,
    Assignment as TasksIcon,
    Settings as SettingsIcon,
    Info as InfoIcon,
    HelpOutline as FeedbackIcon,
    ExpandMore as ExpandMoreIcon,
    Logout as LogoutIcon, // <-- IMPORTAR ICONO LOGOUT
  } from '@mui/icons-material';
  import { Link } from 'react-router-dom';
  import { Tooltip } from '@mui/material';
  import AddIcon from '@mui/icons-material/Add';
  import EditIcon from '@mui/icons-material/Edit';
  import DoneIcon from '@mui/icons-material/Done';
  
  const menuItemsTop = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Nuevo Enriquecimiento', icon: <AddIcon />, path: '/nuevo' },
    { text: 'Activos', icon: <EditIcon />, path: '/activos' },
    { text: 'Finalizados', icon: <DoneIcon />, path: '/finalizados' },
  ];
  
  const menuItemsBottom = [
    { text: 'Configuración', icon: <SettingsIcon />, path: '/configuracion' },
    { text: 'Planes', icon: <InfoIcon />, path: '/planes' },
    { text: 'Contacto', icon: <FeedbackIcon />, path: '/contacto' },
  ];
  
  export default function Sidebar() {
    return (
      <Box
        sx={{
          height: '100vh',
          width: 240,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#111827',
          color: '#fff',
          p: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Logo Section */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight="bold">Pharedata Booster</Typography>
            <Typography variant="body2" color="gray">MVP 1.0</Typography>
          </Box>
          
        </Box>
  
        {/* Menu Items Top */}
        <List sx={{ flexGrow: 1 }}>
          {menuItemsTop.map((item) => (
            <ListItemButton
              component={Link}
              to={item.path}
              key={item.text}
              sx={{
                color: 'inherit',
                borderRadius: 2,
                '&.Mui-selected': { backgroundColor: '#1f2937' },
                '&:hover': { backgroundColor: '#1f2937' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
  
        {/* Divider */}
        <Divider sx={{ my: 2, backgroundColor: '#334155' }} />
  
        {/* Menu Items Bottom */}
        <List>
          {menuItemsBottom.map((item) => (
            <ListItemButton
              component={Link}
              to={item.path}
              key={item.text}
              sx={{
                color: 'inherit',
                borderRadius: 2,
                '&.Mui-selected': { backgroundColor: '#1f2937' },
                '&:hover': { backgroundColor: '#1f2937' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
  
        {/* Plan Expiration Notice */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#1f2937',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            ✨ Créditos disponibles se están agotando
          </Typography>
          <Typography variant="body2" color="gray" mb={1}>
            Compra una nueva bolsa de créditos con 10% de descuento.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f9fafb',
              color: '#000',
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 'bold',
              width: '100%',
              '&:hover': {
                backgroundColor: '#e5e7eb',
              },
            }}
          >
            Obtener descuento
          </Button>
        </Box> 
  
        {/* User Profile */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1f2937',
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Box display="flex" alignItems="center">
            
            <Box>
            <Tooltip title="Vicente Peralta Nasiff" placement="top" arrow>
                <Typography
                    variant="body2"
                    fontWeight="bold"
                    noWrap
                    sx={{
                    maxWidth: 120, // puedes ajustar este ancho si quieres
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    }}
                >
                    Vicente Peralta Nasiff
                </Typography>
                </Tooltip>
              <Typography variant="caption" color="gray">
                vicente@pharedata.com
              </Typography>
            </Box>
          </Box>
          {/* Icono Logout */}
          <IconButton sx={{ color: 'inherit' }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
  