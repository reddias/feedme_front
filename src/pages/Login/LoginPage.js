import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../api/auth';
import {getCurrentUser} from '../../api/users';
import '../../styles.css';
import '../Login/login.css';
import logo from '../../assets/logo.svg';
import {saveUserToLocalStorage} from '../../utils/authHelper';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            const response = await getCurrentUser();

            console.log('Login successful:', response);

            saveUserToLocalStorage(response);

            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <>
            <div className="login-background"></div>
            <div className="login-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
                <h2>Welcome back</h2>
                <p className="new-user-prompt">
                    New here? <a href="/register" className="signup-link">Create an account</a>
                </p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>

    );
};

export default LoginPage;