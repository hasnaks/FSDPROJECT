// AdminAdoptionMessages.jsx
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
} from '@mui/material';
import axios from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const AdminAdoptionMessages = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://localhost:3005/api/adoption');
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch adoption messages:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: '100vh', bgcolor: '#f3e5f5' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#7e57c2', fontWeight: 'bold' }}
      >
        📨 Adoption Messages
      </Typography>

      <Paper
        elevation={4}
        sx={{ maxWidth: 900, mx: 'auto', p: 4, borderRadius: 3, backgroundColor: '#fff' }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#6a1b9a' }}>
          Received Requests
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {requests.length === 0 ? (
            <Typography align="center" sx={{ color: '#888', mt: 2 }}>
              No adoption requests found.
            </Typography>
          ) : (
            requests.map((req, idx) => (
              <ListItem key={idx} alignItems="flex-start" divider>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#7e57c2' }}>
                    <MailOutlineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {req.fullName} ({req.email})
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        📞 {req.phone}<br />🏠 {req.address}<br />💬 {req.reason}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default AdminAdoptionMessages;
