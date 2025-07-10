import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: '#7e57c2', // 🎯 matches your navbar purple
        color: '#fff',
        px: 2,
        py: 4,
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        HappyPaws Pet Care Pvt Ltd
      </Typography>
      <Typography variant="body2">
        Kaloor Tower, Kochi, Kerala – 682017, India
      </Typography>
      <Typography variant="body2">
        Phone: +91 98765 43210
      </Typography>
      <Typography variant="body2">
        Email: support@happypaws.in
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <FacebookIcon />
        <InstagramIcon />
        <TwitterIcon />
        <LinkedInIcon />
      </Stack>

      <Typography
        variant="caption"
        sx={{ display: 'block', mt: 2, fontSize: '0.75rem', color: '#ddd' }}
      >
        © {new Date().getFullYear()} HappyPaws. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
