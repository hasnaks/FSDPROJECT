import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminAdoptionMessages = () => {
  const [requests, setRequests] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3005/api/adoption/requests');
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch adoption messages:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(`http://localhost:3005/api/adoption/delete/${id}`);
      setRequests(prev => prev.filter(req => req._id !== id));
      setSnackbar({ open: true, message: 'Request deleted successfully.', severity: 'success' });
    } catch (err) {
      console.error("Error deleting request:", err);
      setSnackbar({ open: true, message: 'Failed to delete.', severity: 'error' });
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
  const handleSendReply = async (id, userEmail) => {
  try {
    await axios.post('http://localhost:3005/api/replies/send', {
      userEmail,
      requestId: id,
      message: replyText[id],
    });
    alert("Reply sent!");
    setReplyText(prev => ({ ...prev, [id]: '' }));
  } catch (err) {
    alert("Reply failed.");
    console.error(err);
  }
};


  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f3e5f5' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#7e57c2', fontWeight: 'bold' }}>
        📨 Adoption Messages
      </Typography>

      <Paper elevation={4} sx={{ maxWidth: 950, mx: 'auto', p: 4, borderRadius: 3, backgroundColor: '#fff' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a' }}>
          Received Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {requests.length === 0 ? (
          <Typography align="center" sx={{ color: '#888', mt: 2 }}>
            No adoption requests found.
          </Typography>
        ) : (
          <List>
            {requests.map((req) => (
              <ListItem key={req._id} alignItems="flex-start" divider sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#7e57c2' }}>
                        <MailOutlineIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="bold">
                          {req.fullName} ({req.email})
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          📞 {req.phone} | 🏠 {req.address}
                        </Typography>
                      }
                    />
                  </Box>
                  <IconButton onClick={() => handleDelete(req._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box sx={{ ml: 7, mt: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    💬 Reason: {req.reason}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    🐶 Pet: <strong>{req.petName}</strong> ({req.petType}, {req.petBreed})
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    label="Reply message"
                    placeholder="Type a reply to the user..."
                    value={replyText[req._id] || ''}
                    onChange={(e) => handleReplyChange(req._id, e.target.value)}
                    sx={{ mt: 2 }}
                  />
                  <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 1, backgroundColor: '#7e57c2', '&:hover': { backgroundColor: '#673ab7' } }}
                  onClick={() => handleSendReply(req._id, req.email)}
                >
                  Send Reply
                </Button>

                </Box>
              </ListItem>
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
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAdoptionMessages;
