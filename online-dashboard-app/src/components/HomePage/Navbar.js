import React from 'react';
import '../../styles/Navbar.css'
import logo from '../../Images/2.PNG'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand"><img src={logo} height='40px'></img></div>
            <ul className="navbar-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
