import React from 'react';
import NavigationDrawer from '../../../components/Admin/NavigationDrawer/NavigationDrawer';
import Header from '../../../components/Admin/Header/Header';
import {getUserFromLocalStorage} from "../../../utils/authHelper"; // Ensure getRecipes is correctly imported
import './settings.css';
import photo from "../../../assets/signIn-background.png";
import Settings from "../../../components/Settings/Settings";

const Recipes = () => {
    const user = getUserFromLocalStorage();

    return (
        <div>
            <NavigationDrawer/>
            <div className="admin-settings-content">
                <Header user={user}/>
                <div className="admin-user-profile-container">
                    <div className="admin-user-info">
                        <img
                            src={user?.data?.photo || photo}
                            alt="User Profile"
                            className="admin-user-photo"
                        />
                        <div className="admin-user-details">
                            <h2 className="admin-user-name">{user?.data?.full_name || 'User Name'}</h2>
                            <p className="admin-user-description">
                                {user?.data?.description || 'Description of the user'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="admin-settings-info">
                    <Settings user={user}/>
                </div>
            </div>
        </div>
    );
};

export default Recipes;
