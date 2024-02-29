// GetAllUsers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UpdateUsers from './UpdateUser';
import './Getallusers.css';

function GetAllUsers() {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='Main1'>
      <div className='Main2'>
        <TableContainer component={Paper}>
          <Table className='table' aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: '#78909c', color: '#fff' }}>
                <TableCell style={{ width: '20%' }}>Id</TableCell>
                <TableCell style={{ width: '30%' }}>Email</TableCell>
                <TableCell style={{ width: '30%' }}>Name</TableCell>
                <TableCell style={{ width: '20%' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((person) => (
                <TableRow key={person.id} style={{ backgroundColor: '#cfd8dc', color: '#000' }}>
                  <TableCell>{person.id}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>
                    <UpdateUsers userId={person.id} userEmail={person.email} userName={person.name} onUpdate={getData} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default GetAllUsers;
