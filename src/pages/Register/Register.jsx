import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerThunk, clearError } from '../../store/auth/authReducer';
import '../Login/Login.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setLocalError('Şifrə ən az 6 simvol olmalıdır.');
      return;
    }
    if (form.password !== form.confirm) {
      setLocalError('Şifrələr uyğun gəlmir.');
      return;
    }
    dispatch(registerThunk({
      username: form.username,
      email: form.email,
      password: form.password,
    }));
  };

  const displayError = localError || error;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__logo">
          <img src="/img/logo.jpg" alt="Çukur" />
          <h1>ÇUKUR</h1>
        </div>

        <h2 className="auth-card__title">Qeydiyyat</h2>
        <p className="auth-card__subtitle">Yeni hesab yarat</p>

        {displayError && (
          <div className="auth-alert" role="alert">
            <i className="fa fa-exclamation-circle" /> {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-form__group">
            <label htmlFor="username">İstifadəçi adı</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-user" />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="istifadeci_adi"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="auth-form__group">
            <label htmlFor="reg-email">E-poçt</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-envelope" />
              <input
                id="reg-email"
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
            <label htmlFor="reg-password">Şifrə</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-lock" />
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Ən az 6 simvol"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
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

          <div className="auth-form__group">
            <label htmlFor="confirm">Şifrəni təsdiqlə</label>
            <div className="auth-form__input-wrap">
              <i className="fa fa-lock" />
              <input
                id="confirm"
                type={showPass ? 'text' : 'password'}
                name="confirm"
                placeholder="Şifrəni yenidən daxil et"
                value={form.confirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <><i className="fa fa-spinner fa-spin" /> Gözlə...</> : 'Qeydiyyat'}
          </button>
        </form>

        <p className="auth-card__switch">
          Artıq hesabın var?{' '}
          <Link to="/login">Daxil ol</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
