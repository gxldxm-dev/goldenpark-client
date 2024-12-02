import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import FormGirl from '../components/FormGirl';

const CreateGirl: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create New Girl Profile
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <FormGirl />
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateGirl;