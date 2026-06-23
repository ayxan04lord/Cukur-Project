import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginThunk, clearError } from '../../store/auth/authReducer';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src="/img/logo.jpg" alt="Çukur" />
          <h1>ÇUKUR</h1>
        </div>

        <h2 className="auth-card__title">Daxil ol</h2>
        <p className="auth-card__subtitle">Hesabına giriş et</p>

        {error && (
          <div className="auth-alert" role="alert">
            <i className="fa fa-exclamation-circle" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-form__group">
            <label htmlFor="email">E-poçt</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-envelope" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-form__group">
            <label htmlFor="password">Şifrə</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-lock" />
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-form__eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
              >
                <i className={showPass ? 'fa fa-eye-slash' : 'fa fa-eye'} />
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <><i className="fa fa-spinner fa-spin" /> Gözlə...</> : 'Daxil ol'}
          </button>
        </form>

        <p className="auth-card__switch">
          Hesabın yoxdur?{' '}
          <Link to="/register">Qeydiyyat</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
