import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createUser, getCurrentUser} from '../../api/users';
import {login} from '../../api/auth';

import '../../styles.css';
import '../Register/register.css';
import logo from '../../assets/logo.svg';
import {saveUserToLocalStorage} from "../../utils/authHelper";

const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!first_name || !last_name) {
            setError('Please fill in all fields.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            await createUser({first_name, last_name, email, password});
            await login(email, password);
            const response = await getCurrentUser();

            console.log('Login successful:', response);

            saveUserToLocalStorage(response);

            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <div className='no-scroll'>
            <div className="register-background"></div>
            <div className="registration-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
                <h2>Create an Account</h2>
                <p className="login-prompt">
                    Already have an account? <a href="/login" className="login-link">Sign In</a>
                </p>

                {step === 1 && (
                    <form onSubmit={handleNextStep}>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                value={first_name}
                                onChange={(e) => setfirst_name(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                value={last_name}
                                onChange={(e) => setlast_name(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Next</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleRegistration}>

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
                        {error && <p className="error-message">{error}</p>}

                        <button type="submit">Register</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RegistrationPage;