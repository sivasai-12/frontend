// UpdateUsers.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function UpdateUsers({ userId, userEmail, userName, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState(userEmail);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/update/${userId}`,
        {  
          email: editedEmail,
          name: editedName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        { withCredentials: true }
      );
      onUpdate(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary">Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} label="Email" fullWidth />
          <TextField value={editedName} onChange={(e) => setEditedName(e.target.value)} label="Name" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateUsers;
