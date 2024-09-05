import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../card/Card';

const LikedItemsPage = () => {
  const { likedItems } = useSelector((state) => state.card);
  const cards = useSelector((state) => state.cards); 

  return (
    <div>
      
      <h1>Liked Items</h1>
      <table>
        <th>
          <tr>ID</tr>
          <tr>{}</tr>
        </th>
      </table>
    </div>
  );
};

export default LikedItemsPage;
