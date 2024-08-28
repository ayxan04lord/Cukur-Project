import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
export const addItem = (id) => ({ type: 'ADD_ITEM', payload: id });
export const addItem2 = (id) => ({ type: 'ADD_ITEM2', payload: id });

const Card = ({ id, image, title, content }) => {
    const { items, baskets, likedItems, basketItems } = useSelector((state) => state.card);
    const dispatch = useDispatch();

    const isLiked = likedItems.includes(id);
    const isInBasket = basketItems.includes(id);

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
                <h3 className="card-title">
                    {title} {isLiked && <span>✔️</span>} {isInBasket && <span>🛒</span>}
                </h3>
                <p className="card-text">{content}</p>
                <button className='like' onClick={clickAdd} type='like'>
                    To Like {items[id]}
                </button>
                <button className='basket' onClick={clickHandleAdd}>
                    To Basket {baskets[id]}
                </button>
            </div>
        </div>
    );
};

export default Card;