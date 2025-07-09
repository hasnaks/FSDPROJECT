// AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Manage Dogs & Cats',
      icon: <PetsIcon sx={{ fontSize: 40, color: '#fff' }} />,
      color: '#7e57c2',
      route: '/admin/dogscats',
    },
    {
      title: 'Manage Other Animals',
      icon: <OtherHousesIcon sx={{ fontSize: 40, color: '#fff' }} />,
      color: '#8e24aa',
      route: '/admin/other-animals',
    },
    {
      title: 'Manage Shelters',
      icon: <HomeWorkIcon sx={{ fontSize: 40, color: '#fff' }} />,
      color: '#6a1b9a',
      route: '/admin/shelters',
    },
    {
      title: 'Adoption Messages',
      icon: <MailOutlineIcon sx={{ fontSize: 40, color: '#fff' }} />,
      color: '#5e35b1',
      route: '/admin/adoption-messages',
    },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#7e57c2' }}
      >
        🛠️ Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: 160,
                backgroundColor: section.color,
                color: '#fff',
                borderRadius: 3,
              }}
            >
              <CardActionArea
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                onClick={() => navigate(section.route)}
              >
                {section.icon}
                <CardContent>
                  <Typography variant="subtitle1" align="center">
                    {section.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
