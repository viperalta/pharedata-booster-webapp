import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';

export default function Planes() {
  const planes = [
    {
      nombre: 'Básico',
      precio: '5 UF',
      precioOriginal: null,
      caracteristicas: ['50 enriquecimientos', 'Soporte por correo', 'Actualizaciones menores'],
    },
    {
      nombre: 'Pro',
      precio: '10 UF',
      precioOriginal: '12 UF',
      caracteristicas: ['200 enriquecimientos', 'Soporte prioritario', 'Acceso a funciones beta'],
      destacado: true, // << Best Seller
    },
    {
      nombre: 'Empresa',
      precio: '80 UF',
      precioOriginal: '100 UF',
      caracteristicas: ['Enriquecimientos ilimitados', 'Gestor de cuenta dedicado', 'Integraciones personalizadas'],
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#0a0a0a', minHeight: '100vh', p: 4 }}>
      <Typography variant="h4" align="center" color="white" fontWeight="bold" mb={6}>
        Elige tu Plan
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {planes.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                backgroundColor: '#1e293b',
                color: 'white',
                borderRadius: 3,
                boxShadow: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'visible',
              }}
            >
              {/* Destacado "Best Seller" */}
              {plan.destacado && (
                <Chip
                  label="🔥 Más Vendido"
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#3b82f6',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  }}
                />
              )}

              <CardContent>
                <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
                  {plan.nombre}
                </Typography>

                {/* Precios */}
                <Box textAlign="center" mb={2}>
                  {plan.precioOriginal && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'line-through', color: 'gray' }}
                    >
                      {plan.precioOriginal}
                    </Typography>
                  )}
                  <Typography variant="h4" fontWeight="bold" color="#3b82f6">
                    {plan.precio}
                  </Typography>
                  {plan.precioOriginal && (
                    <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 'bold' }}>
                      Oferta especial
                    </Typography>
                  )}
                </Box>

                {/* Características */}
                <Box component="ul" sx={{ listStyle: 'none', pl: 0, mb: 3 }}>
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <Typography
                      key={idx}
                      component="li"
                      variant="body1"
                      sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '"✔️"',
                          color: '#22c55e',
                          fontSize: '1rem',
                          mr: 1,
                        },
                      }}
                    >
                      {caracteristica}
                    </Typography>
                  ))}
                </Box>

                {/* Botón de acción */}
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#2563eb',
                      },
                    }}
                  >
                    Seleccionar Plan
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
