import React from 'react';
import { Route, Routes } from 'react-router';

import HomePage from './pages/HomePage/HomePage';
import Baskets from './pages/BasketPage/BasketPage';
import Likes from './pages/LikesPage/LikesPage';
import Layout from './layout/Layout';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/baskets' element={<Baskets />} />
          <Route path='/likes' element={<Likes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
