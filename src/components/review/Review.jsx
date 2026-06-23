import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Review.css';

const STORAGE_KEY = 'cukur_reviews';

const loadReviews = (personId) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return all[personId] || [];
  } catch {
    return [];
  }
};

const saveReview = (personId, review) => {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    if (!all[personId]) all[personId] = [];
    all[personId].unshift(review);
    // Hər personaj üçün max 20 şərh saxla
    all[personId] = all[personId].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // noop
  }
};

const StarRating = ({ value, onChange, readOnly = false }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="star-rating" role="group" aria-label="Ulduz reytinqi">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${display >= star ? 'filled' : ''}`}
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          aria-label={`${star} ulduz`}
          disabled={readOnly}
          tabIndex={readOnly ? -1 : 0}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Review = ({ personId, personName }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [reviews, setReviews] = useState(() => loadReviews(personId));
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setReviews(loadReviews(personId));
  }, [personId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) { setError('Şərh boş ola bilməz.'); return; }
    if (rating === 0) { setError('Zəhmət olmasa ulduz reytinqi seçin.'); return; }

    const review = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      text: text.trim(),
      rating,
      date: new Date().toLocaleDateString('az-AZ', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    saveReview(personId, review);
    setReviews((prev) => [review, ...prev]);
    setText('');
    setRating(0);
    setError('');
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="review-section">
      <div className="review-section__header">
        <h4 className="review-section__title">
          <i className="fa fa-comments" /> Fan Şərhləri
        </h4>
        {avgRating && (
          <div className="review-avg">
            <span className="review-avg__num">{avgRating}</span>
            <span className="review-avg__star">★</span>
            <span className="review-avg__count">({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Form — yalnız login olmuş istifadəçilər */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="review-form__top">
            <img src={currentUser.avatar} alt={currentUser.username} className="review-form__avatar" />
            <div className="review-form__inputs">
              <StarRating value={rating} onChange={setRating} />
              <textarea
                value={text}
                onChange={(e) => { setText(e.target.value); setError(''); }}
                placeholder={`${personName} haqqında şərh yaz...`}
                rows={2}
                className="review-form__textarea"
                maxLength={300}
              />
            </div>
          </div>
          {error && <p className="review-form__error"><i className="fa fa-exclamation-circle" /> {error}</p>}
          <div className="review-form__footer">
            <span className="review-form__char">{text.length}/300</span>
            <button type="submit" className="review-form__submit">
              <i className="fa fa-paper-plane" /> Göndər
            </button>
          </div>
        </form>
      ) : (
        <p className="review-login-hint">
          <i className="fa fa-lock" /> Şərh yazmaq üçün{' '}
          <a href="/login">daxil ol</a>
        </p>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="review-empty">Hələ şərh yoxdur. İlk şərhi sən yaz!</p>
      ) : (
        <ul className="review-list">
          {reviews.map((r) => (
            <li key={r.id} className="review-item">
              <img src={r.avatar} alt={r.username} className="review-item__avatar" />
              <div className="review-item__body">
                <div className="review-item__top">
                  <span className="review-item__user">{r.username}</span>
                  <StarRating value={r.rating} readOnly />
                  <span className="review-item__date">{r.date}</span>
                </div>
                <p className="review-item__text">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;
