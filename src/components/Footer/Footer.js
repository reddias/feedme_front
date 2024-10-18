import React from 'react';
import { Link } from 'react-router-dom';
import reverseLogo from '../../assets/reverse-logo.svg';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <Link to="/" className="footer-logo">
                    <img src={reverseLogo} alt="Logo"/>
                </Link>

                <nav>
                    <ul className="footer-nav-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </nav>

                <div className="social-media-links">
                    <a href="mailto:plzfeedme@itechart.com" target="_blank" rel="noopener noreferrer">Email Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;