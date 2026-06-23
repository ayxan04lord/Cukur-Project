import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/auth/authReducer';
import { toggleTheme } from '../../store/theme/themeReducer';
import { clearUserData } from '../../store/card/cardReducer';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const likedCount = useSelector((state) => state.card.likedItems.length);
  const basketCount = useSelector((state) => state.card.basketItems.length);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const themeMode = useSelector((state) => state.theme.mode);

  // User menu-nu kənarda klik edəndə bağla
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutThunk());
    dispatch(clearUserData());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src="/img/logo.jpg" alt="Çukur Logo" />
          <span>ÇUKUR</span>
        </NavLink>
      </div>

      <button
        className={`navbar__burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menyu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Ana Səhifə</NavLink></li>
        <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>Mövsümlər</NavLink></li>
        <li><NavLink to="/quiz" onClick={() => setMenuOpen(false)}>Quiz</NavLink></li>
        <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Haqqında</NavLink></li>
        <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Əlaqə</NavLink></li>
      </ul>

      <div className="navbar__actions">
        {/* Dark/Light toggle */}
        <button
          className="navbar__icon-btn navbar__theme-btn"
          onClick={() => dispatch(toggleTheme())}
          aria-label={themeMode === 'dark' ? 'İşıqlı rejim' : 'Qaranlıq rejim'}
          title={themeMode === 'dark' ? 'İşıqlı rejim' : 'Qaranlıq rejim'}
        >
          <i className={themeMode === 'dark' ? 'fa fa-sun' : 'fa fa-moon'} />
        </button>

        {/* Səbət */}
        <NavLink to="/baskets" className="navbar__icon-btn" aria-label="Səbət">
          <i className="fa fa-shopping-basket" />
          {basketCount > 0 && <span className="badge">{basketCount}</span>}
        </NavLink>

        {/* Bəyənilənlər */}
        <NavLink to="/likes" className="navbar__icon-btn" aria-label="Bəyənilənlər">
          <i className="fa fa-heart" />
          {likedCount > 0 && <span className="badge">{likedCount}</span>}
        </NavLink>

        {/* Auth */}
        {currentUser ? (
          <div className="navbar__user" ref={userMenuRef}>
            <button
              className="navbar__user-btn"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-label="İstifadəçi menyusu"
              aria-expanded={userMenuOpen}
            >
              <img src={currentUser.avatar} alt={currentUser.username} className="navbar__user-avatar" />
              <span className="navbar__user-name">{currentUser.username}</span>
              <i className={`fa fa-chevron-${userMenuOpen ? 'up' : 'down'} navbar__user-chevron`} />
            </button>

            {userMenuOpen && (
              <div className="navbar__user-menu">
                <NavLink
                  to="/profile"
                  className="navbar__user-menu-item"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <i className="fa fa-user" /> Profilim
                </NavLink>
                <NavLink
                  to="/likes"
                  className="navbar__user-menu-item"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <i className="fa fa-heart" /> Bəyənilənlər
                </NavLink>
                <NavLink
                  to="/baskets"
                  className="navbar__user-menu-item"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <i className="fa fa-shopping-basket" /> Səbətim
                </NavLink>
                <div className="navbar__user-menu-divider" />
                <button className="navbar__user-menu-item navbar__user-menu-item--logout" onClick={handleLogout}>
                  <i className="fa fa-sign-out-alt" /> Çıxış
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="navbar__login-btn">
            <i className="fa fa-sign-in-alt" /> Daxil ol
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
