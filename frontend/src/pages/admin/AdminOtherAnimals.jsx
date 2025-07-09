import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia,
  CardActions, Button, TextField, Paper, Snackbar, Alert
} from '@mui/material';
import axios from 'axios';

const AdminOtherAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({
    name: '', type: '', breed: '', age: '', address: '', phone: '', image: ''
  });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchAnimals = async () => {
    try {
      const res = await axios.get('http://localhost:3005/api/otherpets');
      setAnimals(res.data);
    } catch (err) {
      console.error('Error fetching animals:', err);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, type, breed, age, address, phone } = form;
    if (!name || !type || !breed || !age || !address || !phone) {
      return setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'warning' });
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3005/api/admin/otherpets/edit/${editId}`, form);
        setSnackbar({ open: true, message: 'Animal updated!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3005/api/admin/otherpets/add', form);
        setSnackbar({ open: true, message: 'Animal added!', severity: 'success' });
      }
      setForm({ name: '', type: '', breed: '', age: '', address: '', phone: '', image: '' });
      setEditId(null);
      fetchAnimals();
    } catch (err) {
      console.error('Error saving animal:', err);
      setSnackbar({ open: true, message: 'Save failed.', severity: 'error' });
    }
  };

  const handleEdit = (animal) => {
    setForm({
      name: animal.name,
      type: animal.type,
      breed: animal.breed,
      age: animal.age,
      address: animal.address,
      phone: animal.phone,
      image: animal.image
    });
    setEditId(animal._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/admin/otherpets/delete/${id}`);
      setSnackbar({ open: true, message: 'Animal deleted.', severity: 'info' });
      fetchAnimals();
    } catch (err) {
      console.error('Error deleting animal:', err);
      setSnackbar({ open: true, message: 'Delete failed.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
        Admin: Other Animals Management
      </Typography>

      {/* Form */}
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          {editId ? 'Edit Animal' : 'Add New Animal'}
        </Typography>
        <Grid container spacing={2}>
          {['name', 'type', 'breed', 'age', 'address', 'phone', 'image'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                fullWidth
                required={['name', 'type', 'breed', 'age', 'address', 'phone'].includes(field)}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ bgcolor: '#7e57c2', '&:hover': { bgcolor: '#673ab7' } }}
              onClick={handleSubmit}
            >
              {editId ? 'Update Animal' : 'Add Animal'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Cards */}
      <Grid container spacing={3}>
        {animals.map((animal) => (
          <Grid item xs={12} sm={6} md={3} key={animal._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {animal.image && (
                <CardMedia component="img" height="180" image={animal.image} alt={animal.name} />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{animal.name}</Typography>
                <Typography variant="body2">Type: {animal.type}</Typography>
                <Typography variant="body2">Breed: {animal.breed}</Typography>
                <Typography variant="body2">Age: {animal.age}</Typography>
                <Typography variant="body2">Address: {animal.address}</Typography>
                <Typography variant="body2">Phone: {animal.phone}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(animal)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(animal._id)}>Delete</Button>
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

export default AdminOtherAnimals;
