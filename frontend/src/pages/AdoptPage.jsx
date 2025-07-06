import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';

const AdoptPage = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f3e5f5', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#7e57c2', fontWeight: 'bold' }}
      >
        How to Adopt a Pet
      </Typography>

      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
        <Card sx={{ backgroundColor: '#ede7f6' }}>
          <CardContent>
            {/* Adoption Steps */}
            <Typography variant="h6" sx={{ color: '#5e35b1', mb: 2 }}>
              <PetsIcon sx={{ mr: 1 }} />
              Adoption Procedure
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Browse pets and select one to adopt" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Click the Adopt button to express interest" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Our team will contact you for a quick verification" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Visit the shelter to meet your new companion" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Complete final paperwork and take your pet home!" />
              </ListItem>
            </List>

            {/* Precautions */}
            <Typography variant="h6" sx={{ color: '#5e35b1', mt: 4, mb: 2 }}>
              <InfoIcon sx={{ mr: 1 }} />
              Precautions & Tips
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Ensure your home is pet-ready and safe" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Discuss pet responsibilities with your family" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon /></ListItemIcon>
                <ListItemText primary="Consider your daily routine and lifestyle compatibility" />
              </ListItem>
            </List>

            {/* Contact Info */}
            <Typography variant="h6" sx={{ color: '#5e35b1', mt: 4, mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              Contact for Adoption
            </Typography>
            <Typography>Email: support@happypaws.com</Typography>
            <Typography>Phone: +91 98765 43210</Typography>

            {/* Fake Address */}
            <Typography variant="h6" sx={{ color: '#5e35b1', mt: 4, mb: 1 }}>
              <HomeIcon sx={{ mr: 1 }} />
              Visit Our Shelter
            </Typography>
            <Typography>
              Happy Paws Adoption Center, Near Green Park,
              <br />
              MG Road, Kochi, Kerala – 682016
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdoptPage;
