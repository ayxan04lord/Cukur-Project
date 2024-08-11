import React from 'react';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
const Card = ({image, title, content }) => {

    const {numOfItems, numOfBasket} = useSelector((state) => state);
    const dispatch = useDispatch();
    const clickAdd = () =>{
        dispatch({type:'ADD_ITEM'})
    }

    const clickHandleAdd = () => {
        dispatch({type:'ADD2_ITEM'})
    }
    
    
    return (
        
        <div className="card">
            
        
            <div className="card-content">
                <img style={{objectFit:"cover"}} width={270}  height={300} src={image} alt="" />
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content}</p>
                <button onClick={clickAdd} type='like'>To Like {numOfItems}</button>
                <button className='basket' onClick={clickHandleAdd}>To Basket {numOfBasket}</button>
            </div>
        </div>
    );
};

export default Card;



