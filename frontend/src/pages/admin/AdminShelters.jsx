import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, TextField, Button, Snackbar, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdminShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [form, setForm] = useState({
    name: '', address: '', contact: '', capacity: ''
  });
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchShelters = async () => {
    try {
      const res = await axios.get('http://localhost:3005/api/shelters');
      setShelters(res.data);
    } catch (err) {
      console.error('Error fetching shelters:', err);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, address, contact, capacity } = form;
    if (!name || !address || !contact || !capacity) {
      return setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' });
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3005/api/admin/shelters/edit/${editId}`, form);
        setSnackbar({ open: true, message: 'Shelter updated!', severity: 'success' });
      } else {
        await axios.post('http://localhost:3005/api/admin/shelters/add', form);
        setSnackbar({ open: true, message: 'Shelter added!', severity: 'success' });
      }
      setForm({ name: '', address: '', contact: '', capacity: '' });
      setEditId(null);
      fetchShelters();
    } catch (err) {
      console.error('Error saving shelter:', err);
      setSnackbar({ open: true, message: 'Save failed.', severity: 'error' });
    }
  };

  const handleEdit = (shelter) => {
    setForm(shelter);
    setEditId(shelter._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/api/admin/shelters/delete/${id}`);
      setSnackbar({ open: true, message: 'Shelter deleted.', severity: 'info' });
      fetchShelters();
    } catch (err) {
      console.error('Error deleting shelter:', err);
      setSnackbar({ open: true, message: 'Delete failed.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f3e5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
        Admin: Animal Shelters
      </Typography>

      {/* Add/Edit Form */}
      <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mb: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a' }}>
          {editId ? 'Edit Shelter' : 'Add New Shelter'}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Address" name="address" value={form.address} onChange={handleChange} fullWidth />
          <TextField label="Contact" name="contact" value={form.contact} onChange={handleChange} fullWidth />
          <TextField label="Capacity" name="capacity" value={form.capacity} onChange={handleChange} fullWidth />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2, bgcolor: '#7e57c2', '&:hover': { bgcolor: '#673ab7' } }}
          onClick={handleSubmit}
        >
          {editId ? 'Update Shelter' : 'Add Shelter'}
        </Button>
      </Paper>

      {/* Shelter Table */}
      <Paper sx={{ maxWidth: 1000, mx: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#7e57c2' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Capacity</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shelters.map((shelter) => (
                <TableRow key={shelter._id}>
                  <TableCell>{shelter.name}</TableCell>
                  <TableCell>{shelter.address}</TableCell>
                  <TableCell>{shelter.contact}</TableCell>
                  <TableCell>{shelter.capacity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(shelter)}><EditIcon color="primary" /></IconButton>
                    <IconButton onClick={() => handleDelete(shelter._id)}><DeleteIcon color="error" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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

export default AdminShelters;
