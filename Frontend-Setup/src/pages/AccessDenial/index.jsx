import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(-1); 
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4">Page Not Found</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>The page you are looking for does not exist.</Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome} sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
