import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../card/Card';

const LikedItemsPage = () => {
  const { likedItems } = useSelector((state) => state.card);
  const cards = useSelector((state) => state.cards); 

  return (
    <div>
      <h1>Liked Items</h1>
      <div className="cards-list">
        {likedItems.map(id => {
          const card = cards.find(c => c.id === id);
          return card ? (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              content={card.content}
              image={card.image}
            />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default LikedItemsPage;
