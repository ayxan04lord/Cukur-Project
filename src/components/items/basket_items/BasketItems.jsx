import React from 'react';
import { useSelector } from 'react-redux';

const BasketItems = () => {
  const getBaskets = useSelector((state) => state.card.baskets || {});
  console.log(getBaskets)
  const basketsCalculate = Object.values(getBaskets).reduce((acc, cur) => acc + cur, 0);

  return (
    <div>
      <h1>Basket Items</h1>
      <table id="myTable" className='table table-striped '>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total Likes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{basketsCalculate}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
};

export default BasketItems;
