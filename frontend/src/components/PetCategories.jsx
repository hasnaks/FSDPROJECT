import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const PetCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: <PetsIcon sx={{ fontSize: 50 }} />,
      label: 'Dogs & Cats',
      color: '#7e57c2',
      route: '/pets',
    },
    {
      icon: <EmojiNatureIcon sx={{ fontSize: 50 }} />,
      label: 'Other Animals',
      color: '#26a69a',
      route: '/category/other-animals',
    },
    {
      icon: <HomeWorkIcon sx={{ fontSize: 50 }} />,
      label: 'Shelters',
      color: '#5c6bc0',
      route: '/category/shelters',
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 50 }} />,
      label: 'Favorites',
      color: '#ec407a',
      route: '/category/favorites',
    },
  ];

  return (
    <Box sx={{ mt: 6, px: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{
          flexGrow: 1,
          fontWeight: 'bold',
          fontSize: '1.5rem',
          fontFamily: 'Roboto, sans-serif',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        Browse by Category
      </Typography>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        {categories.map((cat) => (
          <Grid item xs={6} sm={3} key={cat.label}>
            <Paper
              elevation={4}
              onClick={() => navigate(cat.route)}
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: cat.color,
                  color: '#fff',
                },
              }}
            >
              {cat.icon}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {cat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetCategories;
