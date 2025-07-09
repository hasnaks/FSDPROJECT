import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, List, ListItem, ListItemText, Divider,
  IconButton, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Messages = () => {
  const [replies, setReplies] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const userEmail = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.email || '';
    } catch {
      return '';
    }
  })();

  const fetchReplies = async () => {
    try {
      const res = await axios.get(`http://localhost:3005/api/replies/${userEmail}`);
      setReplies(res.data);
    } catch (err) {
      console.error('Failed to load replies:', err);
    }
  };

  useEffect(() => {
    if (userEmail) fetchReplies();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reply message?')) return;

    try {
      await axios.delete(`http://localhost:3005/api/replies/delete/${id}`);
      setReplies(prev => prev.filter(msg => msg._id !== id));
      setSnackbar({ open: true, message: 'Message deleted successfully.', severity: 'success' });
    } catch (err) {
      console.error('Delete failed:', err);
      setSnackbar({ open: true, message: 'Failed to delete message.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f3e5f5' }}>
      <Typography variant="h4" align="center" sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
        📩 Your Adoption Messages
      </Typography>

      <Paper sx={{ mt: 4, p: 3, maxWidth: 800, mx: 'auto', bgcolor: '#fff' }} elevation={3}>
        {replies.length === 0 ? (
          <Typography align="center" color="text.secondary">No messages yet.</Typography>
        ) : (
          <List>
            {replies.map((msg) => (
              <React.Fragment key={msg._id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(msg._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        🐾 Pet: {msg.petName || 'N/A'} ({msg.petType || 'Unknown'}, {msg.petBreed || 'Unknown'})
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                          💬 {msg.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          📅 {new Date(msg.sentAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages;
