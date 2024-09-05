import React, { useEffect, useState } from 'react';

import Card from '../card/Card';

import './CardList.css'

const CardList = () => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/person')
            .then(response => response.json())
            .then(data => setCardsData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    return (
        <div className="cards-list">
            <div className="text">
                <span>Characters</span>
            </div>
            <div className="row">
            {cardsData.map(card => (
                <Card
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    content={card.content}
                    image={card.image}
                />
            ))}
            </div>
            
        </div>
    );
};

export default CardList;
