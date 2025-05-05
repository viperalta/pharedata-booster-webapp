import { Box, Typography, TextField, Button, IconButton, Alert } from '@mui/material';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Correo inválido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      setShowSuccess(true);
      setFormData({
        nombre: '',
        correo: '',
        mensaje: '',
      });
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Box sx={{ backgroundColor: '#0a0a0a', minHeight: '100vh', py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
      <Typography variant="h4" align="center" color="white" fontWeight="bold" mb={6}>
        Contáctanos
      </Typography>

      {/* Contenedor del formulario */}
      <Box sx={{ position: 'relative', width: { xs: '100%', sm: '500px' }, mb: 6 }}>
        {/* Mensaje de éxito encima */}
        {showSuccess && (
          <Alert
            severity="success"
            sx={{
              position: 'absolute',
              bottom: -30,
              left: 0,
              right: 0,
              mx: 'auto',
              width: '100%',
              borderRadius: 2,
            }}
          >
            ¡Mensaje enviado correctamente!
          </Alert>
        )}

        {/* Formulario */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: '#1f2937',
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            name="nombre"
            label="Nombre"
            variant="outlined"
            fullWidth
            value={formData.nombre}
            onChange={handleChange}
            error={Boolean(errors.nombre)}
            helperText={errors.nombre}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: '#334155' },
            }}
          />
          <TextField
            name="correo"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            value={formData.correo}
            onChange={handleChange}
            error={Boolean(errors.correo)}
            helperText={errors.correo}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: '#334155' },
            }}
          />
          <TextField
            name="mensaje"
            label="Mensaje"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            value={formData.mensaje}
            onChange={handleChange}
            error={Boolean(errors.mensaje)}
            helperText={errors.mensaje}
            sx={{
              textarea: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: '#334155' },
            }}
          />
          <Button
            type="submit"
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
            Enviar Mensaje
          </Button>
        </Box>
      </Box>

      {/* Redes sociales */}
      <Box
        sx={{
          backgroundColor: '#1e293b',
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          width: { xs: '100%', sm: '500px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold" textAlign="center">
          También puedes encontrarnos en
        </Typography>
        <Box display="flex" gap={2}>
          {[
            { icon: <Facebook fontSize="large" />, link: 'https://www.facebook.com' },
            { icon: <Instagram fontSize="large" />, link: 'https://www.instagram.com' },
            { icon: <LinkedIn fontSize="large" />, link: 'https://www.linkedin.com' },
          ].map((social, idx) => (
            <IconButton
              key={idx}
              component="a"
              href={social.link}
              target="_blank"
              sx={{
                color: 'white',
                transition: 'all 0.3s',
                '&:hover': {
                  color: '#3b82f6',
                  transform: 'scale(1.2)',
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
