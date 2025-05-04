import { Box, Button, TextField, Grid, Typography, IconButton, Modal } from '@mui/material';
import { useState, useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Nuevo() {
  const [productos, setProductos] = useState([
    { titulo: '', categoria: '', color: '', precio: '', variantes: '', tipo: '', sexo: '', selectedFiles: [] },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [nuevoField, setNuevoField] = useState({ tipo: '', sexo: '' });
  const fileInputRefs = useRef([]);

  const handleAddProducto = () => {
    setProductos([...productos, { titulo: '', categoria: '', color: '', precio: '', variantes: '', tipo: '', sexo: '', selectedFiles: [] }]);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...productos];
    updated[index][field] = value;
    setProductos(updated);
  };

  const handleFileSelect = (index, event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setOpenErrorModal(true);
      return;
    }
    const updated = [...productos];
    updated[index].selectedFiles = [...updated[index].selectedFiles, ...validFiles]; // 👈 cambio aquí
    setProductos(updated);
  };

  const handleDrop = (index, event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setOpenErrorModal(true);
      return;
    }
    const updated = [...productos];
    updated[index].selectedFiles = [...updated[index].selectedFiles, ...validFiles];
    setProductos(updated);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleCancelFiles = (index) => {
    const updated = [...productos];
    updated[index].selectedFiles = [];
    setProductos(updated);
  };

  const handleDeleteProducto = (index) => {
    const updated = [...productos];
    updated.splice(index, 1);
    setProductos(updated);
  };

  const handleProcesarProductos = () => {
    const data = {
      PRODUCTOS: productos.map(p => ({
        titulo: p.titulo,
        categoria: p.categoria,
        color: p.color,
        precio: p.precio,
        variantes: p.variantes,
        tipo: p.tipo,
        sexo: p.sexo,
        archivos: p.selectedFiles,
      })),
    };
    console.log(data);
  };

  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setNuevoField({
      tipo: productos[index].tipo || '',
      sexo: productos[index].sexo || '',
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGuardarField = () => {
    const updated = [...productos];
    updated[currentIndex].tipo = nuevoField.tipo;
    updated[currentIndex].sexo = nuevoField.sexo;
    setProductos(updated);
    setOpenModal(false);
  };

  const handleAddMoreFiles = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleDeleteImage = (productoIndex, imageIndex) => {
    const updated = [...productos];
    updated[productoIndex].selectedFiles.splice(imageIndex, 1);
    setProductos(updated);
  };
  

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#0a0a0a', borderRadius: 2, minHeight: 'calc(100vh - 64px)' }}>
      {/* Botones principales */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Button
          variant="contained"
          onClick={handleAddProducto}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#3b82f6',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#2563eb' },
          }}
        >
          Agregar nuevo producto
        </Button>

        <Button
          variant="contained"
          startIcon={<FileUploadIcon />}
          sx={{
            backgroundColor: '#10b981',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#059669' },
          }}
        >
          Cargar Excel
        </Button>

        <Button
          variant="contained"
          startIcon={<AutoFixNormalIcon />}
          onClick={handleProcesarProductos}
          sx={{
            backgroundColor: '#0ea5e9',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#0284c7' },
          }}
        >
          Procesar Productos
        </Button>
      </Box>

      {/* Renderizar productos */}
      {productos.map((producto, index) => (
        <Grid container spacing={4} key={index} mb={4} alignItems="stretch">
          {/* Formulario */}
          <Grid item xs={12} md={5}>
            <Box sx={{ backgroundColor: '#1f2937', p: 3, borderRadius: 2, height: '100%' }}>
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                margin="normal"
                value={producto.titulo}
                onChange={(e) => handleInputChange(index, 'titulo', e.target.value)}
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                  fieldset: { borderColor: '#334155' },
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Categoría"
                    variant="outlined"
                    margin="normal"
                    value={producto.categoria}
                    onChange={(e) => handleInputChange(index, 'categoria', e.target.value)}
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
                    value={producto.color}
                    onChange={(e) => handleInputChange(index, 'color', e.target.value)}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Precio"
                    variant="outlined"
                    margin="normal"
                    value={producto.precio}
                    onChange={(e) => handleInputChange(index, 'precio', e.target.value)}
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
                    value={producto.variantes}
                    onChange={(e) => handleInputChange(index, 'variantes', e.target.value)}
                    sx={{
                      input: { color: 'white' },
                      label: { color: 'white' },
                      fieldset: { borderColor: '#334155' },
                    }}
                  />
                </Grid>
              </Grid>
              <Box mt={3}>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal(index)}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#2563eb' },
                  }}
                >
                  Agregar / Editar Detalles
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Drag and Drop */}
          <Grid item xs={12} md={5}>
            <Box
              onDrop={(event) => handleDrop(index, event)}
              onDragOver={handleDragOver}
              sx={{
                border: '2px dashed #334155',
                borderRadius: 2,
                backgroundColor: '#1f2937',
                minHeight: '400px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}
            >
              {producto.selectedFiles.length === 0 ? (
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
                    <input hidden type="file" multiple onChange={(event) => handleFileSelect(index, event)} ref={(el) => (fileInputRefs.current[index] = el)} />
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                    Imágenes cargadas
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mb={2}>
                    {producto.selectedFiles.map((file, fileIndex) => (
                      <Box
                        key={fileIndex}
                        sx={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          borderRadius: 2,
                          overflow: 'hidden',
                          backgroundColor: '#1f2937',
                        }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteImage(index, fileIndex)}
                          sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: '#ef4444',
                            color: 'white',
                            width: 24,
                            height: 24,
                            '&:hover': { backgroundColor: '#dc2626' },
                            zIndex: 10,
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    ))}

                    {/* Botón grande de + */}
                    <IconButton
                      onClick={() => handleAddMoreFiles(index)}
                      sx={{
                        border: '2px dashed #3b82f6',
                        color: '#3b82f6',
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': { backgroundColor: '#1e293b' },
                      }}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 48 }} />
                      <input
                        hidden
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(event) => handleFileSelect(index, event)}
                        ref={(el) => (fileInputRefs.current[index] = el)}
                      />
                    </IconButton>
                  </Box>

                  {/* Botón Cancelar */}
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleCancelFiles(index)}
                      sx={{
                        borderColor: '#3b82f6',
                        color: '#3b82f6',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': { borderColor: '#2563eb', color: '#2563eb' },
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>

                </>
              )}
            </Box>
          </Grid>

          {/* Basurero */}
          <Grid item xs={12} md={2} display="flex" alignItems="center" justifyContent="center">
            <IconButton
              onClick={() => handleDeleteProducto(index)}
              sx={{
                backgroundColor: '#ef4444',
                color: 'white',
                width: 64,
                height: 64,
                '&:hover': { backgroundColor: '#dc2626' },
              }}
            >
              <DeleteIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Modal agregar o editar tipo y sexo */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: '#1f2937', borderRadius: 2, p: 4, boxShadow: 24 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
            Agregar o Editar Tipo y Sexo
          </Typography>
          <TextField
            fullWidth
            label="Tipo"
            variant="outlined"
            margin="normal"
            value={nuevoField.tipo}
            onChange={(e) => setNuevoField({ ...nuevoField, tipo: e.target.value })}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: '#334155' },
            }}
          />
          <TextField
            fullWidth
            label="Sexo"
            variant="outlined"
            margin="normal"
            value={nuevoField.sexo}
            onChange={(e) => setNuevoField({ ...nuevoField, sexo: e.target.value })}
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: '#334155' },
            }}
          />
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" color="error" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleGuardarField}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal error de archivos */}
      <Modal open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: '#1f2937', borderRadius: 2, p: 4, boxShadow: 24, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
            Error
          </Typography>
          <Typography sx={{ mb: 2, color: 'white' }}>
            Sólo se permiten archivos de imagen.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenErrorModal(false)}
            sx={{
              backgroundColor: '#ef4444',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#dc2626' },
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
