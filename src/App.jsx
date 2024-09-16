import React from 'react';
import { Route, Routes } from 'react-router';

import Home from './pages/Home/Home';
import Baskets from './pages/Basket/Basket';
import Likes from './pages/Likes/Likes';
import Layout from './layout/Layout';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/baskets' element={<Baskets />} />
          <Route path='/likes' element={<Likes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
