import './Navbar.css';
import logo from '../../img/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';



const Navbar = () => {
    const {numOfBasket} = useSelector((state) => state);
    const dispatch = useDispatch();
    

    const clickHandleAdd = () => {
        dispatch({type:'ADD2_ITEM'})
    }
    

    return (
        <ul>
            <li><a href="#"><img width={20} src={logo} alt="logo" /></a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">About</a></li>
            <li style={{ marginLeft: 'auto' }}><i className='fa fa-shopping-basket'></i>{numOfBasket}</li>
        </ul>
    );
};

export default Navbar;
