import React from 'react';
import './settings.css';
import {getCurrentUser} from '../../api/users';


const Settings = ({user}) => {
    const handleEditClick = async (field) => {
        // Handle edit click for different fields (name, email, password)
        console.log(`Edit ${field}`);
        console.log(await getCurrentUser());


    };
    // localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjYyMzU4MTEsImV4cCI6MTcyNjMyMjIxMSwibmJmIjoxNzI2MjM1ODExLCJqdGkiOiJSaEttbHltUnFiaDJRaWpEIiwic3ViIjoiMyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qzXGmmYiJ8RTsDmb85ZFrJ5L3x8vKCS43qYpa5uFOeI');
    // console.log(localStorage.getItem('token'));
    console.log(user);
    return (
        <div className="settings-container">
            <div className="settings-header">
                <h2>Personal Information</h2>
                <button className="edit-button" onClick={() => handleEditClick('personal-info')}>
                    Edit
                </button>
            </div>
            <div className="settings-info">
                <div className="info-item">
                    <label>Name:</label>
                    <span>{user?.data?.full_name}</span>

                </div>
                <div className="info-item">
                    <label>Email:</label>
                    <span>{user?.data?.email}</span>
                </div>
                <div className="info-item">
                    <label>Password:</label>
                    <span>•••••••••</span>
                    <button className="edit-button" onClick={() => handleEditClick('password')}>
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
