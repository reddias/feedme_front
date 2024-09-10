import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {login} from "../api/auth";  // Import useNavigate for navigation

const LoginPage = () => {
    const [email, setEmail] = useState('');        // State for email
    const [password, setPassword] = useState('');  // State for password
    const navigate = useNavigate();                // Hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');        // Navigate to dashboard on successful login
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;