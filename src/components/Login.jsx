import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userslice';
import './Login.css';
import axios from 'axios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/api/auth/login', { email, password })
            .then(response => {
                dispatch(
                    login({
                        email: email,
                        token: response.data.token,
                    })
                );
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('user not found');
            });
    }
    return (
        <div className='login'>
            <form className='login_form' onSubmit={(e) => handleSubmit(e)}>
                <h3>Enter details to Login </h3>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="login_btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
