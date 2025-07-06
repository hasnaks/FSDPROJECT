import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Favorite Pets
      </Typography>
      {favorites.length === 0 ? (
        <Typography align="center">You haven’t liked any pets yet.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {favorites.map(pet => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <Card>
                <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">Breed: {pet.breed}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Address: {pet.address}</Typography>
                  <Typography variant="body2">Phone: {pet.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
