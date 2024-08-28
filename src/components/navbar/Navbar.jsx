import './Navbar.css';
import logo from '../../img/logo.jpg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const getBaskets = useSelector((state) => state.card.baskets || {});

    
    let basketsCalculate = 0;
    if (Object.keys(getBaskets).length !== 0) {
        basketsCalculate = Object.values(getBaskets).reduce((acc, cur) => acc + cur, 0);
    }

    return (
        <div className="">
            <div className="navbar">
                <div className="nav__logo">
                    <Link to="/">
                        <img width={20} src={logo} alt="Company logo" />
                    </Link>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/liked">Liked Items</Link></li>
                    <li><Link to="/basket">Basket Items</Link></li>
                    
                </ul>

                <div className="nav__baskets">
                    <i className='fa fa-shopping-basket'></i>
                    <span>{basketsCalculate}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
