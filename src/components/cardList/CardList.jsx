import React from 'react';
import Card from '../card/Card';
import img4 from '../../img/vartolu.jpg';
import img5 from '../../img/yamac.png';
import img1 from '../../img/cumali.png';
import img3 from '../../img/selim.png';
import img2 from '../../img/kahraman.jpg';

const CardList = () => {
    const cardsData = [
        { id: 1, title: 'Necip Memili', content: 'Cumali Koçovalı', image: img1 },
        { id: 2, title: 'Mustafa Üstündağ', content: 'Kahraman Koçovalı', image: img2 },
        { id: 3, title: 'Öner Erkan', content: 'Selim Koçovalı', image: img3 },
        { id: 4, title: 'Erkan Kolçak Köstendil', content: 'Vartolu Saadettin', image: img4 },
        { id: 5, title: 'Aras Bulut İynemli', content: 'Yamaç Koçovalı', image: img5 },
    ];

    return (
        <div className="cards-list">
            {cardsData.map(card => (
                <Card
                    key={card.id}
                    id={card.id}  // Передача id
                    title={card.title}
                    content={card.content}
                    image={card.image}
                />
            ))}
        </div>
    );
};

export default CardList;
