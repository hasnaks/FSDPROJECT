import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  CardMedia, CardActions, Button, TextField, Paper,
  Snackbar, Alert, MenuItem
} from '@mui/material';
import axios from 'axios';
import UploadForm from '../../components/UploadForm';

const AdminDogsCats = () => {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: '', breed: '', age: '', address: '', phone: '', image: '', type: ''
  });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:3005/api/pets');
      setPets(res.data);
    } catch (err) {
      console.error('Error fetching pets:', err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, breed, age, address, phone, type } = form;
    if (!name || !breed || !age || !address || !phone || !type) {
      return setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'warning' });
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3005/api/admin/pets/edit/${editId}`, form);
        setSnackbar({ open: true, message: 'Pet updated successfully!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3005/api/admin/pets/add', form);
        setSnackbar({ open: true, message: 'New pet added!', severity: 'success' });
      }

      setForm({ name: '', breed: '', age: '', address: '', phone: '', image: '', type: '' });
      setEditId(null);
      fetchPets();
    } catch (err) {
      console.error('Error saving pet:', err);
      setSnackbar({ open: true, message: 'Failed to save pet.', severity: 'error' });
    }
  };

  const handleEdit = (pet) => {
    setForm({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      address: pet.address,
      phone: pet.phone,
      image: pet.image,
      type: pet.type || ''
    });
    setEditId(pet._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/admin/pets/delete/${id}`);
      setSnackbar({ open: true, message: 'Pet deleted.', severity: 'info' });
      fetchPets();
    } catch (err) {
      console.error('Error deleting pet:', err);
      setSnackbar({ open: true, message: 'Delete failed.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
        🐶 Admin: Dogs & Cats Management 🐱
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mb: 5 }}>
        <Typography variant="h6" gutterBottom>{editId ? 'Edit Pet Details' : 'Add New Dog or Cat'}</Typography>
        <Grid container spacing={2}>
          {/* Basic Info */}
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Breed" name="breed" value={form.breed} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Age" name="age" value={form.age} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth required />
          </Grid>

          {/* Address and Type */}
          <Grid item xs={12}>
            <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
            </TextField>
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
           <UploadForm onUpload={(url) => setForm(prev => ({  image: url }))} />
          </Grid>


          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#7e57c2', '&:hover': { bgcolor: '#673ab7' } }}
              onClick={handleSubmit}
              fullWidth
            >
              {editId ? 'Update Pet' : 'Add Pet'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Display Cards */}
      <Grid container spacing={3}>
        {pets
          .filter(p => p.type === 'Dog' || p.type === 'Cat')
          .map((pet) => (
            <Grid item xs={12} sm={6} md={3} key={pet._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {pet.image && (
                        <CardMedia component="img" height="180" image={pet.image} alt={pet.name} />
                      )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2">Type: {pet.type}</Typography>
                  <Typography variant="body2">Breed: {pet.breed}</Typography>
                  <Typography variant="body2">Age: {pet.age}</Typography>
                  <Typography variant="body2">Address: {pet.address}</Typography>
                  <Typography variant="body2">Phone: {pet.phone}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button size="small" onClick={() => handleEdit(pet)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDelete(pet._id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDogsCats;
