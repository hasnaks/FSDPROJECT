import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const pets = [
  {
    name: 'Marigold',
    img: 'https://placedog.net/400/300?id=1',
    type: 'Dog',
  },
  {
    name: 'Pancho',
    img: 'https://placedog.net/400/300?id=2',
    type: 'Dog',
  },
  {
    name: 'Marshmallow',
    img: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=400&h=300&q=80',
    type: 'Cat',
  },
  {
    name: 'Chocolate',
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=400&h=300&q=80',
    type: 'Cat',
  },
];

export default function FeaturedPets() {
  return (
    <Box sx={{ mt: 6, px: 2 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 'bold', mb: 3, color: '#7e57c2' }}
      >
        Pets Available for Adoption Nearby
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {pets.map((pet) => (
          <Grid item xs={12} sm={6} md={3} key={pet.name}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Like Button - no action */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  zIndex: 2,
                }}
              >
                <FavoriteBorderIcon color="error" />
              </IconButton>

              {/* Pet Image */}
              <CardMedia
                component="img"
                image={pet.img}
                alt={pet.name}
                sx={{
                  height: 200,
                  objectFit: 'cover',
                }}
              />

              {/* Pet Info */}
              <CardContent
                sx={{
                  textAlign: 'center',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{ color: '#7e57c2', fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  {pet.name}
                </Typography>
                <Chip
                  label={pet.type}
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: pet.type === 'Dog' ? '#81d4fa' : '#f48fb1',
                    color: '#fff',
                    alignSelf: 'center',
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
