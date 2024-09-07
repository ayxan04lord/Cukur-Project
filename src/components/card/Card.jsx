import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBasket, toggleLike, addItem, addItem2 } from '../../store/card/cardReducer';

import './Card.css'



const Card = ({ id, image, title, content, wikipedia }) => {
    const { items, baskets, likedItems, basketItems } = useSelector((state) => state.card);
    const dispatch = useDispatch();

    const isLiked = likedItems.includes(id);
    const isInBasket = basketItems.includes(id);

    const clickAdd = () => {
        dispatch(addItem(id));
    }

    const handleLikeToggle = useCallback(() => {
        dispatch(toggleLike(id));
    }, [dispatch, id]);

    const clickHandleAdd = () => {
        dispatch(addItem2(id));

    }

    const handleBasketToggle = useCallback(()=>{
        dispatch(toggleBasket(id));
    }, [dispatch, id])

    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-content">
                    <a href={image} target="_blank" rel="noopener noreferrer"><img style={{ objectFit: "cover" }} width={270} height={300} src={image} alt={title} /></a>
                    <h3 className="card-title">
                        <a target='_blank' rel="noreferrer" href={wikipedia}>{title}</a>  
                    </h3>
                    <p className="card-text">{content}</p>
                    <button className='button' onClick={handleLikeToggle}>
                        {isLiked ? (
                            <i className="fa fa-heart red"></i>
                        ) : (
                            <i className="fa-regular fa-heart"></i>
                        )}
                    </button>
                    
                    <button className='button' onClick={handleBasketToggle}>
                    {isInBasket ? (
                            <i className="fa fa-shopping-basket red"></i>
                        ) : (
                            <i className="fa fa-shopping-basket"></i>
                        )}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Card;