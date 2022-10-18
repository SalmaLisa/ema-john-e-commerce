import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    
    const handleLogOut = () => {
        logOut()
            .then(() => {})
        .catch(error=>console.error(error))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.email ? 
                        <Link onClick={handleLogOut} to="/login">Log Out</Link>
                        :
                        <Link to="/login">Log In</Link>
                }
               
                {
                    user?.email && <Link> {user.email}</Link>
                }
                
            </div>
        </nav>
    );
};

export default Header;