import React, { useState, useEffect } from 'react';
import NavigationDrawer from '../../../components/Admin/NavigationDrawer/NavigationDrawer';
import Header from '../../../components/Admin/Header/Header';
import { getUserFromLocalStorage } from "../../../utils/authHelper"; // Ensure getUsers is correctly imported
import {getUsers} from "../../../api/users";
import './users.css';

const Users = () => {
    const user = getUserFromLocalStorage();
    const [activeTab, setActiveTab] = useState('all');
    const [menuOpen, setMenuOpen] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setAllUsers(usersData);
            } catch (error) {
                console.error('Fetch failed:', error.message);
            }
        };
        fetchUsers(); // Call the fetch function
    }, []); // Empty dependency array to run only once when the component mounts

    const blockedUsers = allUsers.filter(user => user.status === 'blocked');
    const deletedUsers = allUsers.filter(user => user.status === 'deleted');

    const renderUserList = () => {
        const usersToDisplay = activeTab === 'all' ? allUsers :
            activeTab === 'blocked' ? blockedUsers : deletedUsers;

        return usersToDisplay.length > 0 ? (
            <div className="user-list">
                {/* Table headers */}
                <div className="user-list-header">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Recipes</div>
                    <div>Status</div>
                    <div className="user-list-options"></div>
                </div>

                {/* User rows */}
                {usersToDisplay.map(user => (
                    <div className="user-item" key={user.id}>
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                        <div className="user-recipe-number">{user.recipes}</div>

                        {/* Status with color button */}
                        <div>
                            <button className={`status-btn ${user.status.toLowerCase()}`}>
                                {user.status}
                            </button>
                        </div>

                        {/* Actions menu */}
                        <div className="user-options">
                            <button
                                className="options-btn"
                                onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}>
                                &#x2026;
                            </button>

                            {menuOpen === user.id && (
                                <div className="options-menu">
                                    <span onClick={() => console.log('Viewing user', user.id)}>View</span>
                                    <span onClick={() => console.log('Blocking user', user.id)}>Block</span>
                                    <span onClick={() => console.log('Deleting user', user.id)}>Delete</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>No users available in this category.</p>
        );
    };

    return (
        <div>
            <NavigationDrawer />
            <div className="admin-content">
                <Header user={user} />
                <div className="users-tabs-container">
                    {/* Tabs */}
                    <div className="users-tabs">
                        <span
                            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Users
                        </span>
                        <span
                            className={`tab ${activeTab === 'blocked' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blocked')}
                        >
                            Blocked Users
                        </span>
                        <span
                            className={`tab ${activeTab === 'deleted' ? 'active' : ''}`}
                            onClick={() => setActiveTab('deleted')}
                        >
                            Deleted Users
                        </span>
                    </div>

                    {/* Render User List */}
                    {renderUserList()}
                </div>
            </div>
        </div>
    );
};

export default Users;
