import React, { useState } from 'react';
import './navigationDrawer.css'; // Import the CSS file for styles
import logo from '../../../assets/logo.svg'; // Replace with your actual logo
import usersIcon from '../../../assets/usersIcon.svg'; // Replace with your actual icon
import statisticsIcon from '../../../assets/statisticsIcon.svg';
import recipesIcon from '../../../assets/recipesIcon.svg';
import settingsIcon from '../../../assets/settingsIcon.svg';
import usersIconActive from '../../../assets/usersIconYellow.svg';
import statisticsIconActive from '../../../assets/statisticsIconYellow.svg';
import recipesIconActive from '../../../assets/recipesIconYellow.svg';
import settingsIconActive from '../../../assets/settingsIconYellow.svg';
import {useNavigate} from "react-router-dom";

const NavigationDrawer = () => {
    const [activePage, setActivePage] = useState('users'); // State to track the active page

    const navigate = useNavigate();

    // List of pages with icons and names
    const menuItems = [
        { id: 'users', name: 'Users', icon: usersIcon, activeIcon: usersIconActive },
        { id: 'statistics', name: 'Statistics', icon: statisticsIcon, activeIcon: statisticsIconActive },
        { id: 'recipes', name: 'Recipes', icon: recipesIcon, activeIcon: recipesIconActive },
        { id: 'settings', name: 'Settings', icon: settingsIcon, activeIcon: settingsIconActive },
    ];

    const handleMenuClick = (id) => {
        setActivePage(id);
        navigate('/admin/' + id);
    };

    return (
        <div className="drawer-container">
            <div className="drawer-logo">
                <img src={logo} alt="Logo" className="drawer-logo-img" />
            </div>
            <ul className="drawer-menu">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`drawer-menu-item ${activePage === item.id ? 'active' : ''}`}
                        onClick={() => handleMenuClick(item.id)}
                    >
                        <img
                            src={activePage === item.id ? item.activeIcon : item.icon}
                            alt={`${item.name} icon`}
                            className="drawer-menu-icon"
                        />
                        <span className="drawer-menu-text">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavigationDrawer;