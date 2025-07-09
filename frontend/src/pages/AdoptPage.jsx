import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import axios from 'axios';

const AdoptPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    reason: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/adoption', form);
      alert("Your adoption request has been submitted!");
      setForm({ fullName: '', email: '', phone: '', address: '', reason: '' });
    } catch (err) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', bgcolor: '#ffffff' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2' }}>
          Adoption Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
            required
            type="tel"
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Why do you want to adopt?"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#7e57c2',
              '&:hover': { backgroundColor: '#673ab7' },
            }}
          >
            Submit Application
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdoptPage;
