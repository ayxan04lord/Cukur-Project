// BasketItemsPage.js
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../card/Card';

const BasketItemsPage = () => {
  const { basketItems } = useSelector((state) => state.card);
  const cards = useSelector((state) => state.cards); // Путь к данным карт может быть другой

  return (
    <div>
      <h1>Basket Items</h1>
      <div className="cards-list">
        {basketItems.map(id => {
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

export default BasketItemsPage;
