import React from 'react';
import { Route, Routes } from 'react-router';

import Home from './pages/home/Home';
import Baskets from './pages/baskets/Baskets';
import Likes from './pages/like/Likes';
import Layout from './layout/Layout';

function App() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/baskets' element={<Baskets />} />
          <Route path='/likes' element={<Likes />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
