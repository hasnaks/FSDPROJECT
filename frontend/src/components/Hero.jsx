import React from 'react'
import { Box, Typography } from '@mui/material';

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: '85vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1574158622682-e40e69881006')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        px: 2,
      }}
    >
      <Box sx={{ bgcolor: 'rgba(0,0,0,0.5)', p: 4, borderRadius: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Find Your New Best Friend
        </Typography>
        <Typography variant="h6">
          Adopt a pet and change a life — including your own.
        </Typography>
      </Box>
    </Box>
  );
}