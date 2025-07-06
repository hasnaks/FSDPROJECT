import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const OtherAnimals = () => {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    axios.get('http://localhost:3005/api/otherpets')
      .then(res => setPets(res.data))
      .catch(err => console.error('Error fetching pets:', err));
  }, []);

  const isFavorite = (petId) => {
    return favorites.some((fav) => fav._id === petId);
  };

  const handleFavoriteClick = (pet) => {
    toggleFavorite(pet); // ✅ Just toggle favorite, no navigation
  };

  const handleAdopt = (pet) => {
    navigate('/adopt', { state: { pet } });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Other Animals for Adoption
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {pets
          .filter(pet => pet.type?.toLowerCase() !== 'dog' && pet.type?.toLowerCase() !== 'cat')
          .map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <Card sx={{ position: 'relative' }}>
                <IconButton
                  onClick={() => handleFavoriteClick(pet)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: isFavorite(pet._id) ? 'red' : 'gray',
                    backgroundColor: '#fff'
                  }}
                >
                  {isFavorite(pet._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">Type: {pet.type}</Typography>
                  <Typography variant="body2">Breed: {pet.breed}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Address: {pet.address}</Typography>
                  <Typography variant="body2">Phone: {pet.phone}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#7e57c2', '&:hover': { backgroundColor: '#673ab7' } }}
                      onClick={() => handleAdopt(pet)}
                    >
                      Adopt
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default OtherAnimals;
