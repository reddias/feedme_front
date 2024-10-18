import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navigationDrawer.css';
import logo from '../../../assets/logo.svg';
import usersIcon from '../../../assets/usersIcon.svg';
import statisticsIcon from '../../../assets/statisticsIcon.svg';
import recipesIcon from '../../../assets/recipesIcon.svg';
import settingsIcon from '../../../assets/settingsIcon.svg';
import usersIconActive from '../../../assets/usersIconYellow.svg';
import statisticsIconActive from '../../../assets/statisticsIconYellow.svg';
import recipesIconActive from '../../../assets/recipesIconYellow.svg';
import settingsIconActive from '../../../assets/settingsIconYellow.svg';

const NavigationDrawer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePage, setActivePage] = useState('users');

    // List of pages with icons and names
    const menuItems = [
        { id: 'users', name: 'Users', icon: usersIcon, activeIcon: usersIconActive, route: '/admin/users' },
        { id: 'statistics', name: 'Statistics', icon: statisticsIcon, activeIcon: statisticsIconActive, route: '/admin/statistics' },
        { id: 'recipes', name: 'Recipes', icon: recipesIcon, activeIcon: recipesIconActive, route: '/admin/recipes' },
        { id: 'settings', name: 'Settings', icon: settingsIcon, activeIcon: settingsIconActive, route: '/admin/settings' },
    ];

    // Update the activePage based on the current route
    useEffect(() => {
        const currentPath = location.pathname;
        const currentPage = menuItems.find(item => item.route === currentPath);
        if (currentPage) {
            setActivePage(currentPage.id);
        }
    }, [location.pathname]);

    const handleMenuClick = (id, route) => {
        setActivePage(id);
        navigate(route);
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
                        onClick={() => handleMenuClick(item.id, item.route)}
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