import React from 'react';
import { useSelector } from 'react-redux';


const LikedItems = () => {
    const getLikes = useSelector((state) => state.card.likedItems || []);
    const items = useSelector((state) => state.card.items);
    const likedMovies = items.filter((item) => getLikes.includes(item.id));

    console.log(likedMovies)
    // const totalLikes = Object.values(getLikes).reduce((acc, cur) => acc + cur, 0); 
    return (
      <div>
        <h1>Liked Items</h1>
        <table id="myTable" className='table table-striped '>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total Likes</th>
            </tr>
          </thead>
          <tbody>
            {likedMovies.map((items, index)=>(
              <tr>
              <td>{items.title}</td>
              <td>Liked</td>
            </tr>
            ))}
              
            
          </tbody>
        </table>
      </div>
    );
};

export default LikedItems;
