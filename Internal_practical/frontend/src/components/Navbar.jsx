// frontend/src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaHome, FaTachometerAlt } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="logo-container">
          <NavLink to="/" className="logo">
            <span className="logo-icon">Sx</span>
            <span className="brand">My Portal</span>
          </NavLink>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className={`nav-links ${isOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </NavLink>
          
          {!user ? (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <FaSignInAlt className="nav-icon" />
                <span>Login</span>
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <FaUserPlus className="nav-icon" />
                <span>Register</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <FaTachometerAlt className="nav-icon" />
                <span>Dashboard</span>
              </NavLink>
              <div className="user-menu">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span>{user.name || user.email.split('@')[0]}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
