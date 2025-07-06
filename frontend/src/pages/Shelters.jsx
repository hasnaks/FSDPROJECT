import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer
} from '@mui/material';

const Shelters = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/api/shelters')
      .then(res => setShelters(res.data))
      .catch(err => console.error('Error fetching shelters:', err));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#6a1b9a' }}>
        Animal Shelters
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 900, mx: 'auto', mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#7e57c2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelters.map((shelter) => (
              <TableRow key={shelter._id}>
                <TableCell>{shelter.name}</TableCell>
                <TableCell>{shelter.address}</TableCell>
                <TableCell>{shelter.contact}</TableCell>
                <TableCell>{shelter.capacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Shelters;
