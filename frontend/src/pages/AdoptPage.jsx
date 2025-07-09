import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Divider
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const AdoptPage = () => {
  const location = useLocation();
  const pet = location.state?.pet || {};

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    reason: '',
    petId: pet._id || '',
    petName: pet.name || '',
    petType: pet.type || '',
    petBreed: pet.breed || '',
  });

  // ⬇️ Get user email from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      setForm(prev => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/adoption/apply', form);
      alert("✅ Your adoption request has been submitted!");
      setForm({
        fullName: '',
        email: form.email, // retain auto-filled email
        phone: '',
        address: '',
        reason: '',
        petId: '',
        petName: '',
        petType: '',
        petBreed: ''
      });
    } catch (err) {
      console.error("❌ Submission failed:", err);
      alert("❌ Submission failed. Please try again.");
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: 'auto', bgcolor: '#ffffff' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
          🐾 Adoption Form
        </Typography>

        {pet.name && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>{pet.name}</Typography>
            <Typography variant="body2">Breed: {pet.breed}</Typography>
            <Typography variant="body2">Age: {pet.age}</Typography>
            <Typography variant="body2">Type: {pet.type}</Typography>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* ✅ Instruction message */}
        <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 2 }}>
          ⚠️ Your email has been auto-filled. The admin will use it to reply.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField fullWidth required label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} margin="normal" />
          <TextField
            fullWidth
            required
            label="Email Address"
            name="email"
            value={form.email}
            disabled
            margin="normal"
          />
          <TextField fullWidth required label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} margin="normal" />
          <TextField fullWidth required label="Address" name="address" value={form.address} onChange={handleChange} margin="normal" />
          <TextField fullWidth required label="Why do you want to adopt?" name="reason" multiline rows={4} value={form.reason} onChange={handleChange} margin="normal" />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: '#7e57c2', '&:hover': { bgcolor: '#673ab7' } }}
          >
            Submit Application
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdoptPage;
