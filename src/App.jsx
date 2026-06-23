import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Layout        from './layout/Layout';
import Home          from './pages/Home/Home';
import Products      from './pages/Products/Products';
import About         from './pages/About/About';
import Contact       from './pages/Contact/Contact';
import Baskets       from './pages/Basket/Basket';
import Likes         from './pages/Likes/Likes';
import Login         from './pages/Login/Login';
import Register      from './pages/Register/Register';
import Profile       from './pages/Profile/Profile';
import Quiz          from './pages/Quiz/Quiz';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import { fetchPersons, fetchSeasons, fetchSlides } from './store/content/contentReducer';
import { fetchLikes, fetchBasket, clearUserData }  from './store/card/cardReducer';
import './App.css';

function App() {
  const dispatch    = useDispatch();
  const themeMode   = useSelector((s) => s.theme.mode);
  const currentUser = useSelector((s) => s.auth.currentUser);

  // Dark/light body class
  useEffect(() => {
    document.body.classList.toggle('light', themeMode === 'light');
    document.body.classList.toggle('dark',  themeMode === 'dark');
  }, [themeMode]);

  // App açıldıqda public content-i bir dəfə yüklə
  useEffect(() => {
    dispatch(fetchPersons());
    dispatch(fetchSeasons());
    dispatch(fetchSlides());
  }, [dispatch]);

  // Login/logout-da user data-nı sinxronizə et
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchLikes());
      dispatch(fetchBasket());
    } else {
      dispatch(clearUserData());
    }
  }, [currentUser, dispatch]);

  return (
    <Routes>
      {/* Auth — layout-suz */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Əsas layout */}
      <Route path="/" element={<Layout />}>
        <Route index          element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="quiz"     element={<Quiz />} />
        <Route path="about"    element={<About />} />
        <Route path="contact"  element={<Contact />} />

        {/* Protected */}
        <Route path="baskets" element={<ProtectedRoute><Baskets /></ProtectedRoute>} />
        <Route path="likes"   element={<ProtectedRoute><Likes /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
