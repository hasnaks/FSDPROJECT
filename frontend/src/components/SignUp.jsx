import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate hook

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:3005/api/users/register', {
        name,
        email,
        password,
      });

      setMessage('Account created successfully!');
      alert('Account created!');
      navigate('/login'); // ✅ Redirect to login page

    } catch (err) {
      console.error('Signup failed:', err);
      setMessage(err.response?.data?.message || 'Signup error');
    }

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            margin="normal"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#7e57c2',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#673ab7',
              },
            }}
          >
            Create Account
          </Button>
          {message && (
            <Typography align="center" color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
