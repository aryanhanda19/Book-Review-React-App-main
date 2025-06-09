import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="navbar">
            <div className='nav-title-container'>
                <Link to="/" className='nav-title'>Book Review</Link>
            </div >
            <div ref={dropdownRef}>
                <img
                    className="menu-logo"
                    src={`${process.env.PUBLIC_URL}/menu.png`}  // Use absolute path
                    alt="Menu"
                    onClick={toggleDropdown}
                />
                <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <Link onClick={toggleDropdown} to="/">Home</Link>
                    <Link onClick={toggleDropdown} to="/displayBooks">Display Books</Link>
                    <Link onClick={toggleDropdown} to="/add">Add Book</Link>
                    <Link onClick={toggleDropdown} to="/about-us">About Us</Link>
                </div>
            </div>
        </div >
    );
};

export default Navbar;
