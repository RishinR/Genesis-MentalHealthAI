import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const StyledSelect = styled(Select)`
  background-color: #fff; /* Set the background color to white */
  color: #000; /* Set the text color to black */
`;

const Directory = () => {
  const [location, setLocation] = useState('');
  const [therapists, setTherapists] = useState([]);

  
  // Sample therapist data
  const therapistsData = [
    { name: 'Therapist 1', phone: '123-456-7890', email: 'therapist1@example.com', specialty: 'Specialty A', location: 'Location A' },
    { name: 'Therapist 2', phone: '987-654-3210', email: 'therapist2@example.com', specialty: 'Specialty B', location: 'Location B' },
    // Add more therapist data as needed
  ];

  const filterTherapists = async (event) => {
           
    const response = await fetch('http://localhost:9337/allPsyData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: location      
      }),
    });

    const data = await response.json();
    setTherapists(data);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant='h3'>Therapist Directory</Typography>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <StyledSelect
          label="Select Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <MenuItem value="">Select a Location</MenuItem>
          <MenuItem value="Trivandrum">Trivandrum</MenuItem>
          <MenuItem value="Chennai">Chennai</MenuItem>
          <MenuItem value="Bangalore">Bangalore</MenuItem>
          {/* Add more location options as needed */}
        </StyledSelect>
        <Button variant="contained" onClick={filterTherapists} style={{ marginLeft: '10px' }}>
          Filter
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Specialty</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {therapists.map((therapist, index) => (
              <TableRow key={index}>
                <TableCell>{therapist.name}</TableCell>
                <TableCell>{therapist.phno}</TableCell>
                <TableCell>{therapist.email}</TableCell>
                <TableCell>{therapist.experience}</TableCell>
                <TableCell>{therapist.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Directory;
