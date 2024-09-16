import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies } from '../../store/card/cardReducer';
import Card from '../card/Card';

import './CardList.css';

const CardList = () => {
    // const [cardsData, setCardsData] = useState([]);
    const dispatch = useDispatch();
    const cardsData = useSelector(state => state.card.items)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/person');
                const data = await response.json();
                // setCardsData(data);
                dispatch(addMovies(data))
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="cards-list">
            <div className="text">
                <span>Characters</span>
            </div>
            <div className="row">
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        id={card.id}
                        title={card.title}
                        content={card.content}
                        image={card.image}
                        wikipedia={card.wikipedia}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardList;
