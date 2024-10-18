import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Person from '../../assets/Person.svg';
import searchIcon from '../../assets/search-icon.svg';
import './header.css';

const Header = ({user}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const name = user?.data?.full_name;

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
        <header className="header">
            <div className="header-content">
                {/* Logo */}
                <Link to="/" className="logo">
                    <img src={logo} alt="Logo"/>
                </Link>

                <nav>
                    <ul className="nav-links">
                        <li>
                            <Link to="/recipes">Recipes</Link>
                        </li>
                    </ul>
                </nav>

                <div className="search-form">
                    <img className="search-icon" src={searchIcon} alt="Logo"/>
                    <input
                        type="text"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="header_user-section">
                    {name ? (
                        <div className="header_user-info">
                            <img src={Person} alt="person-icon"/>
                            <Link to="/user-profile" className="header_user-name">{name}</Link>
                        </div>
                    ) : (
                        <div className="links-container">
                        <Link to="/login" className="sign-in-link">Sign In</Link>
                            <Link to="/register" className="sign-up-link">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;