import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

import logo from '../../img/logo.jpg';

const Navbar = () => {

    const getBaskets = useSelector((state) => state.card.baskets || {});
    const getItems = useSelector((state) => state.card.items || {});

    let basketsCalculate = 0;
    if (Object.keys(getBaskets).length !== 0) {
        basketsCalculate = Object.values(getBaskets).reduce((acc, cur) => acc + cur, 0);
    }

    let itemsCalculate = 0;
    if (Object.keys(getItems).length !== 0) {
        itemsCalculate = Object.values(getItems).reduce((acc, cur) => acc + cur, 0);
    }

    return (
        <div className="">
            <div className="navbar">
                <div className="nav__logo">
                    <NavLink to="/">
                        <img width={20} src={logo} alt="Company logo" />
                    </NavLink>
                </div>
                <ul>
                    <li><NavLink to="/" >Home</NavLink></li>
                    <li><NavLink to="/products" >Products</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    
                    

                </ul>

                <div className="nav__baskets">
                    <NavLink to="/baskets" ><i className='fa fa-shopping-basket'>{basketsCalculate}</i></NavLink>
                    <NavLink to="/likes" ><i className='fa fa-heart-o'>{itemsCalculate}</i></NavLink>
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
