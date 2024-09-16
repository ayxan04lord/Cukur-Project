import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
    

    return (
        <nav className="navbar">
            <div className="nav__logo">
                <NavLink to="/">
                    <img width={20} src="/img/logo.jpg" alt="Company logo" />
                </NavLink>
            </div>
            <ul className="nav__links">
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="nav__baskets">
                <NavLink to="/baskets">
                    <i className='fa fa-shopping-basket'></i>
                    
                </NavLink>
                <NavLink to="/likes">
                    <i className='fa fa-heart-o'></i>
                    
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
