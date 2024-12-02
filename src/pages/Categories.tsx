import {
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useData } from '../hooks/useData';
import Grid from '@mui/material/Grid2';
import Card from '../components/Card';

const Categories: React.FC = () => {
  const { categories, error, loading } = useData()



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

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>

        <Link to="/create-category" style={{ marginLeft: 'auto' }}>create new</Link>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid size={3}>
            <Card item={category} endpoint="http://localhost:3000/api/categories" to={`/category/${category._id}`}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;