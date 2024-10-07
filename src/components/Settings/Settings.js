import React from 'react';
import './settings.css';
import {getCurrentUser} from '../../api/users';


const Settings = ({user}) => {
    const handleEditClick = async (field) => {
        console.log(`Edit ${field}`);
        console.log(await getCurrentUser());
    };

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
