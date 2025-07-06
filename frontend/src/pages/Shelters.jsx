import React from 'react';
import { Box, Typography } from '@mui/material';

const Shelters = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Animal Shelters
      </Typography>
      {/* Replace below with mapped shelter data */}
      <Typography align="center">Shelter information and contacts will appear here.</Typography>
    </Box>
  );
};

export default Shelters;
