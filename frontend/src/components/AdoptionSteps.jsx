import { Box, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PetsIcon from '@mui/icons-material/Pets';

export default function AdoptionSteps() {
  const steps = [
    {
      icon: <HomeIcon sx={{ fontSize: 60, color: '#7e57c2' }} />,
      title: 'Step 1: Prepare Your Home',
      description:
        'Make sure your space is safe, pet-friendly, and calm before bringing your new furry friend home.',
    },
    {
      icon: <ContactPhoneIcon sx={{ fontSize: 60, color: '#7e57c2' }} />,
      title: 'Step 2: Contact the Shelter',
      description:
        'Reach out to the adoption center or shelter to ask questions and understand their process.',
    },
    {
      icon: <PetsIcon sx={{ fontSize: 60, color: '#7e57c2' }} />,
      title: 'Step 3: Meet and Adopt',
      description:
        'Visit, meet the pet, and complete the paperwork. Bring them home with love and care!',
    },
  ];

  return (
    <Box sx={{ mt: 8, px: 2, textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, color: '#4a4a4a' }}
      >
        HOW TO ADOPT A PET?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step) => (
          <Grid item xs={12} sm={6} md={4} key={step.title}>
            <Box sx={{ p: 3 }}>
              {step.icon}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', mt: 2, mb: 1, color: '#7e57c2' }}
              >
                {step.title}
              </Typography>
              <Typography variant="body2">{step.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
