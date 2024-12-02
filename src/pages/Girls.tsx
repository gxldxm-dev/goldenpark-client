import {
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { useData } from '../hooks/useData';
import Card from '../components/card';

const Girls: React.FC = () => {
  const { girls, studios, loading, error } = useData();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const filteredGirls = girls.filter((girl) => girl.status === 'active');

  const gridItems = girls.map((girl) => {
    const studio = studios.find((s) => s._id === girl.studio);
  
    if (!studio) {
      console.warn(`No se encontró el estudio con el _id: ${girl.studio}`);
    }
  
    // Crear un nuevo objeto con la propiedad studio actualizada
    const updatedGirl = { ...girl, studio };
  
    console.log(updatedGirl.studio, "girl.studio después");
  
    return (
      <Grid size={{xs: 6, md: 4, lg: 3, xl: 2}} key={girl._id}>
        <Card 
          item={updatedGirl} 
          to={`/girl/${girl._id}`} 
          endpoint='http://localhost:3000/api/girls' 
          imageHeight={400} 
        />
      </Grid>
    );
  });


return (
  <Box my={4}>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Girls
      </Typography>
      <Button component={Link} style={{ marginLeft: 'auto' }} to="/create-girl" color="primary" sx={{ mb: 2 }}>
        Create girl
      </Button>
    </Box>
    <Grid container spacing={3}>
      {gridItems}
    </Grid>
  </Box>
);
};

export default Girls;