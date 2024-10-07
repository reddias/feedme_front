import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../../api/auth';
import {getCurrentUser} from '../../../api/users';
import '../../../styles.css';
import '../Login/login.css';
import logo from '../../../assets/logo.svg';
import {saveUserToLocalStorage} from '../../../utils/authHelper';

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

            navigate('/admin/users');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <>
            <div className="login-full-background"></div> {/* Full page background */}
            <div className="login-box-container">
                <div className="login-logo-container">
                    <img src={logo} alt="Logo" className="login-logo" />
                </div>
                <h2 className="login-title">Login to Admin panel</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="email" className="login-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </>

    );
};

export default LoginPage;