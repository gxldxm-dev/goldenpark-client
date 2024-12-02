import { Card, CardMedia, Typography, Button } from "@mui/material"
import { useState } from "react";

export default function ImegeInputCard({onImage}) {
  // Maneja la selección de archivos
  const [image, setImage] = useState(null); // Estado para almacenar la imagen seleccionada

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo de la imagen
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Actualizar el estado con la URL de la imagen
      };
      reader.readAsDataURL(file); // Leer la imagen como una URL de datos
    }
    onImage(file); //
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        sx={{
          width: "100%",
          minHeight: 250,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          border: '2px dashed #ccc',
          borderRadius: 2,
          position: 'relative',
          marginLeft: 3,
        }}
      >
        {/* Si se ha seleccionado una imagen, mostrarla */}
        {image ? (
          <CardMedia
            component="img"
            sx={{ width: '100%', height: '100%' }}
            image={image}
            alt="Selected Image"
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            <p>Drag & Drop or Click to Upload</p>
          </Typography>
        )}

        {/* Input de archivo invisible, pero activado por el botón */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload-input"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload-input" style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
          <Button
            variant="contained"
            component="span"
            fullWidth
            sx={{ fontWeight: 'bold', backgroundColor: '#3f51b5', textTransform: 'none' }}
          >
            Upload Image
          </Button>
        </label>
      </Card>
    </div>
  )
}