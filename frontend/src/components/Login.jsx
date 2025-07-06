import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper, Link,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3005/api/users/login', credentials);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
      navigate('/'); // redirect
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center">Sign In</Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField fullWidth label="Email" name="email" type="email" margin="normal" required value={credentials.email} onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" margin="normal" required value={credentials.password} onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, backgroundColor: '#7e57c2' }}>
            Login
          </Button>
          {message && <Typography align="center" color="error">{message}</Typography>}
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
