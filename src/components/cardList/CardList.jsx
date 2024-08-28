import React, { useEffect, useState } from 'react';
import Card from '../card/Card';

const CardList = () => {
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        fetch('./cardsData.json')  // Укажи путь к JSON файлу
            .then(response => response.json())
            .then(data => setCardsData(data))
            .catch(error => console.error('Error loading data:', error));
    }, []);

    return (
        <div className="cards-list">
            <div className="text">
                <span>Characters</span>
            </div>
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
    );
};

export default CardList;
