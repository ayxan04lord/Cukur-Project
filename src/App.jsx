// App.js
import React from 'react';
// import { Route, Routes, Link } from 'react-router-dom';
import CardList from './components/cardList/CardList';
// import LikedItemsPage from './components/items/LikedItemsPage'; 
// import BasketItemsPage from './components/items/BasketItemsPage';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Slider from './components/slider/Slider';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Slider />
      <CardList />
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/liked">Liked Items</Link>
        <Link to="/basket">Basket Items</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CardList />} />
        <Route path="/liked" element={<LikedItemsPage />} />
        <Route path="/basket" element={<BasketItemsPage />} />
      </Routes> */}

      <Footer />
    </div>
  );
}

export default App;
