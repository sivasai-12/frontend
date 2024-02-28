import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper } from '@mui/material';
import './Getallusers.css';

function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.error('error fetching data',error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditingUserId(userId);
    setEditedEmail(userToEdit.email);
    setEditedName(userToEdit.name);
  };

  const handleUpdate = async (userId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/update/${userId}`,
        {  
         // email: editedEmail,
          name: editedName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { withCredentials: true }
      );
      const updatedUser = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );
     // setEditingUserId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
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
                      <Button onClick={() => handleEdit(person.id)} variant="outlined" color="primary">edit</Button>
                      { editingUserId === person.id &&  (
                 <div>                  
                      <TextField value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)}/>
                      <TextField value={editedName} onChange={(e) => setEditedName(e.target.value)}/>
                    <Button onClick={() => handleUpdate(person.id)}>update</Button>
                </div>
                      )}       
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
