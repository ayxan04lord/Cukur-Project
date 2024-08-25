import React from 'react';
import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addItem2 } from '../../store/card/cardReducer';

const Card = ({ id, image, title, content }) => {
    const numOfItems = useSelector((state) => state.card);
    const numOfBasket = useSelector((state) => state.card);
    
    const dispatch = useDispatch();
    const clickAdd = () => {
        dispatch(addItem(id));
    }

    const clickHandleAdd = () => {
        dispatch(addItem2(id));
    }
    
    return (
        <div className="card">
            <div className="card-content">
                <img style={{ objectFit: "cover" }} width={270} height={300} src={image} alt={title} />
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content}</p>
                <button className='like' onClick={clickAdd} type='like'>
                    To Like {numOfItems.items[id]}
                </button>
                <button className='basket' onClick={clickHandleAdd}>
                    To Basket {numOfBasket.baskets[id]}
                </button>
            </div>
        </div>
    );
};

export default Card;
