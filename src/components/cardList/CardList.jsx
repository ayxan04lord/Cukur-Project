import React from 'react';
import Card from '../card/Card'; 
import img1 from '../../img/vartolu.jpg'
import img2 from '../../img/yamac.png'
import img3 from '../../img/cumali.png'

const CardList = () => {
    const cardsData = [
        {
            id: 1,
            title: 'Aras Bulut Iynemli',
            content: 'Yamac Kocovali',
            image: img2
        },
        {
            id: 2,
            title: 'Erkan Kolcak Kostendil',
            content: 'Vartolu Saadettin',
            image: img1
        },
        {
            id: 3,
            title: 'Necip Memili',
            content: 'Cumali Kocovali',
            image: img3
        }
    ];

    return (
        <div className="cards-list">
            {cardsData.map(card => (
                <Card 
                    key={card.id} 
                    title={card.title}
                    content={card.content}
                    image={card.image}
                />
            ))}
        </div>
    );
};

export default CardList;
