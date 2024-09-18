import React, { useState, useEffect } from 'react';
import './userProfile.css';
import Settings from '../Settings/Settings';
import Recipe from '../Recipes/Recipes';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import photo from '../../assets/signIn-background.png';
import {getUserFromLocalStorage} from "../../utils/authHelper";


const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('settings');

    const user = getUserFromLocalStorage();
    console.log(user);
    const renderTabContent = () => {
        switch (activeTab) {
            case 'recipes':
                return <Recipe isUserPage={true} />;
            case 'settings':
                return <Settings user={user}/>;
            default:
                return <Settings />;
        }
    };

    return (
        <div className="page-container">
            <Header user={user}/>
            <div className="user-profile-container">
                <div className="user-info">
                    <img
                        src={user?.photo || photo}
                        alt="User Profile"
                        className="user-photo"
                    />
                    <div className="user-details">
                        <h2 className="user-name">{user?.name || 'User Name'}</h2>
                        <p className="user-description">
                            {user?.description || ('description of the user')}
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="tabs">
                    <button
                        className={`tab-link ${activeTab === 'recipes' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('recipes')}
                    >
                        Recipes
                    </button>

                    <button
                        className={`tab-link ${activeTab === 'settings' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Settings
                    </button>
                </div>

                {/* Content Section */}
                <div className="tab-content">{renderTabContent()}</div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
