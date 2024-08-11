import './Navbar.css';
import logo from '../../img/logo.jpg';
import { useSelector } from 'react-redux';
import { selectTotalBasketSum } from './NavbarSelector'; 



const Navbar = () => {
    
    

    const totalBasketSum = useSelector(selectTotalBasketSum);
    

    return (
        <ul>
            <li><a href="#"><img width={20} src={logo} alt="logo" /></a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About</a></li>
            <li style={{ marginLeft: 'auto' }}><i className='fa fa-shopping-basket'></i>{totalBasketSum}</li>
        </ul>
    );
};

export default Navbar;
