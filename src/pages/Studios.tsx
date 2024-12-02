import {
    Box,
    Typography,
    CircularProgress,
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  
  import { useData } from '../hooks/useData';
  import Grid from '@mui/material/Grid2';
  import Card from '../components/card';
import { API_URL } from '../services/api';
  
  const Studios: React.FC = () => {
    const { studios, error, loading } = useData()
  
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
            Studios
          </Typography>
  
          <Link to="/studio/create" style={{ marginLeft: 'auto' }}>create new</Link>
        </Box>
  
        <Grid container spacing={3}>
          {studios.map((studio) => (
            <Grid size={3}>
              <Card item={studio} endpoint={API_URL + "/studios"} to={`/studio/${studio._id}`}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default Studios;