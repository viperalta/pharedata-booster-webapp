import { Box, Button, TextField, Grid, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Nuevo() {
  const [enriquecimientos, setEnriquecimientos] = useState([
    { fields: [], selectedFiles: [] },
  ]);

  const handleAddEnriquecimiento = () => {
    setEnriquecimientos([...enriquecimientos, { fields: [], selectedFiles: [] }]);
  };

  const handleAddField = (index) => {
    const updated = [...enriquecimientos];
    updated[index].fields.push({ categoria: '', color: '', precio: '', variantes: '' });
    setEnriquecimientos(updated);
  };

  const handleFileSelect = (index, event) => {
    const files = Array.from(event.target.files);
    const updated = [...enriquecimientos];
    updated[index].selectedFiles = files;
    setEnriquecimientos(updated);
  };

  const handleDrop = (index, event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const updated = [...enriquecimientos];
    updated[index].selectedFiles = files;
    setEnriquecimientos(updated);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleCancelFiles = (index) => {
    const updated = [...enriquecimientos];
    updated[index].selectedFiles = [];
    setEnriquecimientos(updated);
  };

  const handleDeleteEnriquecimiento = (index) => {
    const updated = [...enriquecimientos];
    updated.splice(index, 1);
    setEnriquecimientos(updated);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#0a0a0a',
        borderRadius: 2,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      {/* Botón principal arriba */}
      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          onClick={handleAddEnriquecimiento}
          sx={{
            backgroundColor: '#3b82f6',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#2563eb' },
          }}
        >
          Agregar nuevo enriquecimiento
        </Button>
      </Box>

      {/* Renderizar todos los enriquecimientos */}
      {enriquecimientos.map((enriquecimiento, index) => (
        <Grid container spacing={4} key={index} mb={4} alignItems="stretch">
          
          {/* Columna izquierda: Formulario */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundColor: '#1f2937',
                p: 3,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                  fieldset: { borderColor: '#334155' },
                }}
              />

              {/* Inputs Categoría y Color */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Categoría"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Color"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Inputs Precio y Variantes */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Precio"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Variantes"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Campos adicionales */}
              {enriquecimiento.fields.map((field, fieldIndex) => (
                <Grid container spacing={2} key={fieldIndex} mt={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={`Categoría adicional ${fieldIndex + 1}`}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        input: { color: 'white' },
                        label: { color: 'white' },
                        fieldset: { borderColor: '#334155' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={`Color adicional ${fieldIndex + 1}`}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        input: { color: 'white' },
                        label: { color: 'white' },
                        fieldset: { borderColor: '#334155' },
                      }}
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Botón Agregar más campos */}
              <Box mt={3}>
                <Button
                  variant="contained"
                  onClick={() => handleAddField(index)}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#2563eb' },
                  }}
                >
                  Agregar más campos
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Columna centro: Drag and Drop */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                border: '2px dashed #334155',
                borderRadius: 2,
                height: '100%',
                minHeight: '400px',
                backgroundColor: '#1f2937',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
              }}
              onDrop={(event) => handleDrop(index, event)}
              onDragOver={handleDragOver}
            >
              {enriquecimiento.selectedFiles.length === 0 ? (
                <>
                  <CloudUploadIcon sx={{ fontSize: 64, color: '#64748b', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Arrastra y suelta tu archivo aquí
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      backgroundColor: '#3b82f6',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#2563eb' },
                    }}
                  >
                    Seleccionar archivo
                    <input hidden type="file" multiple onChange={(event) => handleFileSelect(index, event)} />
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Archivos cargados
                  </Typography>
                  <List sx={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>
                    {enriquecimiento.selectedFiles.map((file, fileIndex) => (
                      <ListItem key={fileIndex}>
                        <ListItemText
                          primary={file.name}
                          primaryTypographyProps={{ style: { color: 'white' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="outlined"
                    onClick={() => handleCancelFiles(index)}
                    sx={{
                      mt: 2,
                      borderColor: '#3b82f6',
                      color: '#3b82f6',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': { borderColor: '#2563eb', color: '#2563eb' },
                    }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </Box>
          </Grid>

          {/* Columna derecha: Basurero */}
          <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
            <IconButton
              onClick={() => handleDeleteEnriquecimiento(index)}
              sx={{
                backgroundColor: '#ef4444',
                color: 'white',
                width: 64,
                height: 64,
                '&:hover': {
                  backgroundColor: '#dc2626',
                },
              }}
            >
              <DeleteIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
