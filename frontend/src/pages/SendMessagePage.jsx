// src/pages/SendMessagePage.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

const SendMessagePage = () => {
  const [form, setForm] = useState({
    toEmail: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/admin/message', form);
      setStatus('✅ Message sent successfully!');
      setForm({ toEmail: '', subject: '', message: '' });
    } catch (err) {
      setStatus('❌ Failed to send message.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#ede7f6' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Send Message to User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="User Email"
            name="toEmail"
            value={form.toEmail}
            onChange={handleChange}
            required
            fullWidth
            type="email"
            margin="normal"
          />
          <TextField
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={5}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#7e57c2', '&:hover': { backgroundColor: '#673ab7' } }}
          >
            Send
          </Button>
        </form>

        {status && (
          <Typography align="center" sx={{ mt: 2 }} color={status.startsWith('✅') ? 'green' : 'red'}>
            {status}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SendMessagePage;
