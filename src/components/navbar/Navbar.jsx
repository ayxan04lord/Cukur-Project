import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const getBaskets = useSelector((state) => state.card.baskets || {});
    const getItems = useSelector((state) => state.card.items || {});

    const basketsCalculate = Object.values(getBaskets).reduce((acc, cur) => acc + cur, 0);
    const itemsCalculate = Object.values(getItems).reduce((acc, cur) => acc + cur, 0);

    return (
        <div className="navbar">
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
                    {basketsCalculate}
                </NavLink>
                <NavLink to="/likes">
                    <i className='fa fa-heart-o'></i>
                    {itemsCalculate}
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
