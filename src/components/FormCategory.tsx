import { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/system';
import ImegeInputCard from './ImegeInputCard';
const typeEnum = ["age", "country", "sexual"]; // Reemplaza con tus valores
const statusEnum = ['active', 'inactive', 'archived']; // Reemplaza con tus valores

// Custom Styled Components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff8e53 30%, #fe6b8b 90%)',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
}));

const CategoryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    popularityScore: 0,
    status: 'active',
    tags: [],
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleImage(image) {
    setFormData({ ...formData, image });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Agregar los campos del formulario
    for (const key in formData) {
      form.append(key, (formData as never)[key]);
    }

    // Agregar el archivo si existe
    /*  if (formData.image) {
       form.append('file', formData.image);
     } else {
       return console.log('No image selected');
     }
  */
    try {
      const response = await fetch('http://localhost:3000/api/categories/create', {
        method: 'POST',
        body: form,  // Enviar FormData sin el header Content-Type
      });

      if (!response.ok) throw new Error('Failed to create category');

      // Manejo de la respuesta si es necesario
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledBox>
      <Typography variant="h4" align="center" gutterBottom>
        Create Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          gap={2} // Espacio entre los elementos (similar a gap en CSS Grid)
        >
          {/* Item 8 / 12 */}
          <Box flex={8}>
            {/* Name */}
            <StyledTextField
              sx={{ width: "50%" }}
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || ''}
              required
            />
            {/* Type */}
            <StyledFormControl
              sx={{ width: "50%" }}>
              <InputLabel>Type</InputLabel>
              <Select


                value={formData.type}
                onChange={handleChange}
                name="type"
                required
              >
                {typeEnum.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            {/* Description */}
            <StyledTextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              {/* Popularity Score */}
              <StyledTextField
                sx={{ width: "50%" }}
                type="number"
                label="Popularity Score"
                name="popularityScore"
                value={formData.popularityScore}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />

              {/* Status */}
              <StyledFormControl sx={{ width: "50%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                >
                  {statusEnum.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Box>
          </Box>
          {/* Item 4 / 12 */}
          <Box flex={4}>
            <ImegeInputCard onImage={handleImage} />
          </Box>
        </Box>



        {/* Submit Button */}
        <StyledButton type="submit" fullWidth>
          Submit
        </StyledButton>
      </form>
    </StyledBox>
  );
};

export default CategoryForm;
