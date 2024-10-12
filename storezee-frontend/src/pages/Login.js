// src/components/LoginPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });
            const { token, user } = response.data; // Assuming login API returns token and user
            dispatch(
                loginSuccess({
                    token,
                    user,
                })
            );

            // Optionally, save the token to localStorage for persistence
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h1> Login </h1>{' '}
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}> Login </button>{' '}
        </div>
    );
};

export default LoginPage;
