import React from 'react';
import Card from '../card/Card';
import img1 from '../../img/cumali.png';
import img2 from '../../img/kahraman.jpg';
import img3 from '../../img/selim.png';
import img4 from '../../img/vartolu.jpg';
import img5 from '../../img/yamac.png';
import img6 from '../../img/idris.png';
import img7 from '../../img/sultan.png';
import img8 from '../../img/akın.jpg';
import img9 from '../../img/karaca.png';
import img10 from '../../img/nedret.webp';
import img11 from '../../img/ayse.png';
import img12 from '../../img/saadet.png';
import img13 from '../../img/damla.jpg';
import img14 from '../../img/aliço.jpeg';

const CardList = () => {
    const cardsData = [
        { id: 1, title: 'Necip Memili', content: 'Cumali Koçovalı', image: img1 },
        { id: 2, title: 'Mustafa Üstündağ', content: 'Kahraman Koçovalı', image: img2 },
        { id: 3, title: 'Öner Erkan', content: 'Selim Koçovalı', image: img3 },
        { id: 4, title: 'Erkan Kolçak Köstendil', content: 'Vartolu Saadettin', image: img4 },
        { id: 5, title: 'Aras Bulut İynemli', content: 'Yamaç Koçovalı', image: img5 },
        { id: 6, title: 'Ercan Kesal', content: 'İdris Koçovalı', image: img6 },
        { id: 7, title: 'Perihan Savaş', content: 'Sultan Koçovalı', image: img7 },
        { id: 8, title: 'Burak Dakak', content: 'Akın Koçovalı', image: img8 },
        { id: 9, title: 'Ece Yaşar', content: 'Karaca Koçovalı', image: img9 },
        { id: 10, title: 'Zeynep Kumral', content: 'Nedret Koçovalı', image: img10 },
        { id: 11, title: 'İrem Altuğ', content: 'Ayşe Koçovalı', image: img11 },
        { id: 12, title: 'Boncuk Yılmaz', content: 'Saadet Koçovalı', image: img12 },
        { id: 13, title: 'Hare Sürel', content: 'Damla Koçovalı', image: img13 },
        { id: 14, title: 'Rıza Kocaoğlu', content: 'Aliço', image: img14 },
    ];

    return (
        <div className="cards-list">
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
