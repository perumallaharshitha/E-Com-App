import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginContext } from '../../contexts/UserLoginContext';
import toast from "react-hot-toast";
import './Header.css';
import UserProfile from '../user-profile/UserProfile';
import logo from '../../assets/logo.png';

function Header() {
  const navigate = useNavigate();
  const { userLoginStatus, setUserLoginStatus, setCurrentUser, logoutUser, currentUser } = useContext(userLoginContext);

  // Logout functionality
  const handleLogout = () => {
    logoutUser(); // Log out the user
    navigate('/'); // Navigate to the home page
    toast.success("Logout Successful", {
      style: {
        marginTop: '-10px',
        marginBottom: '10px',
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#333',
      },
      icon: '👋',
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/"><img src={logo} alt="Site Logo" className="logo" /></Link>
      </div>
      <div className="header-right">
        {!userLoginStatus ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
          </>
        ) : (
          <>
            <Link to="/user-profile">Profile</Link>
            <button className="btn text-light" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
