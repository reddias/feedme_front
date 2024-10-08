import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Person from '../../../assets/Person.svg';
import searchIcon from '../../../assets/admin-search-icon.svg';
import './header.css';

const Header = ({ user }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const name = user.data.full_name;

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <header className="admin-header">
            <div className="admin-header-content">
                <div className="admin-search-form">
                    <img className="admin-search-icon" src={searchIcon} alt="Search Icon" />
                    <input
                        type="text"
                        className="admin-search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                    />
                </div>

                <div className="admin-header-user-section">
                    <div className="admin-header-user-info">
                        <img src={Person} alt="Person Icon" />
                        <Link to="/admin/settings" className="admin-header-user-name">{name}</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
