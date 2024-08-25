import './Navbar.css';
import logo from '../../img/logo.jpg';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const getBaskets = useSelector((state) => state.card.baskets);
    let basketsCalculate = 0;
    if (Object.keys(getBaskets).length !== 0)
        basketsCalculate = Object.values(getBaskets).reduce((acc, cur) => (acc += cur));

    return (
        <div className="container" style={{ display: "flex",flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "gold", padding: "0px 32px" }}>
            <div className="nav__logo">
                <a href="#">
                    <img width={20} src={logo} alt="logo" />
                </a>
            </div>
            <ul >
                <li><a href="#">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">About</a></li>
            </ul>

            <div className="nav__baskets">
                <i className='fa fa-shopping-basket'></i>
                <span>{basketsCalculate}</span>
            </div>
        </div>
    );
};

export default Navbar;
