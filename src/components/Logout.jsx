import React from 'react';
import { useDispatch } from 'react-redux'; 
import { logout } from '../redux/userslice';
import './Logout.css';
import GetAllUsers from '../Getallusers';
const Logout = () => {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logout());
    }
    return (
        <div>
           <h1> <marquee behavior="scroll" direction="right">Hey welcome to dashboard</marquee></h1> 
            <button className="logout_btn" onClick={handleLogout}>
                Logout
            </button>
            <GetAllUsers />
        </div>
    );
};

export default Logout;
