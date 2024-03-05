// UpdateUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
function UpdateUsers({ userId }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(()=> {
axios.get(`http://localhost:3000/api/users/+${userId}`)
.then((res)=> setData(res.data))
.catch((err)=> console.log(err))

  },[]
  )

  const handleUpdate = async () => {
  
    axios.patch(`http://localhost:3000/api/users/${userId}`,data)
    .then((response) => {
      alert("data saved successfully");
      
    })
  };
  
  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" color="primary">Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField disabled value={data.email} onChange={(e) => setData({...data,email:e.target.value})} label="Email" fullWidth />
          <TextField value={data.name} onChange={(e) => setData({...data,name:e.target.value})} label="Name" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button  onClick={()=>{
            handleUpdate();
            handleClose();
            }
            }>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateUsers;
