import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLikeThunk, toggleBasketThunk, toggleLike, toggleBasket } from '../../store/card/cardReducer';
import Review from '../review/Review';
import './Card.css';

const Card = ({ id, image, title, content, wikipedia, roleInfo }) => {
  const { likedItems, basketItems } = useSelector((state) => state.card);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isLiked = likedItems.includes(id);
  const isInBasket = basketItems.includes(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLikeToggle = useCallback(() => {
    if (!currentUser) { navigate('/login'); return; }
    // Optimistik UI yeniləmə
    dispatch(toggleLike(id));
    // Server sync
    dispatch(toggleLikeThunk(id));
  }, [dispatch, id, currentUser, navigate]);

  const handleBasketToggle = useCallback(() => {
    if (!currentUser) { navigate('/login'); return; }
    dispatch(toggleBasket(id));
    dispatch(toggleBasketThunk(id));
  }, [dispatch, id, currentUser, navigate]);

  // ESC ilə modali bağla
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modalOpen]);

  return (
    <>
      <div className="char-card">
        <div className="char-card__img-wrap">
          <img src={image} alt={title} className="char-card__img" />
          <div className="char-card__img-overlay" />
        </div>
        <div className="char-card__body">
          <h3 className="char-card__actor">
            {wikipedia ? (
              <a href={wikipedia} target="_blank" rel="noreferrer" title="Biyografiyaya bax">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>

          <p
            className="char-card__role char-card__role--clickable"
            onClick={() => setModalOpen(true)}
            title="Rol haqqında məlumat"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
          >
            <i className="fa fa-user-circle" /> {content}
          </p>

          <div className="char-card__actions">
            <button
              className={`char-card__btn ${isLiked ? 'active' : ''}`}
              onClick={handleLikeToggle}
              aria-label={isLiked ? 'Bəyənməni ləğv et' : 'Bəyən'}
              title={isLiked ? 'Bəyənməni ləğv et' : 'Bəyən'}
            >
              <i className={isLiked ? 'fa fa-heart' : 'fa-regular fa-heart'} />
            </button>
            <button
              className={`char-card__btn ${isInBasket ? 'active basket' : ''}`}
              onClick={handleBasketToggle}
              aria-label={isInBasket ? 'Səbətdən çıxar' : 'Səbətə əlavə et'}
              title={isInBasket ? 'Səbətdən çıxar' : 'Səbətə əlavə et'}
            >
              <i className="fa fa-shopping-basket" />
            </button>
          </div>
        </div>
      </div>

      {/* Role Info Modal */}
      {modalOpen && (
        <div
          className="role-modal__backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${content} haqqında məlumat`}
        >
          <div className="role-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="role-modal__close"
              onClick={() => setModalOpen(false)}
              aria-label="Bağla"
            >
              <i className="fa fa-times" />
            </button>

            <div className="role-modal__header">
              <img src={image} alt={content} className="role-modal__img" />
              <div>
                <h2 className="role-modal__role">{content}</h2>
                <p className="role-modal__actor">
                  <i className="fa fa-user" /> {title}
                </p>
              </div>
            </div>

            <div className="role-modal__divider" />

            <p className="role-modal__desc">{roleInfo}</p>

            {wikipedia && (
              <a
                href={wikipedia}
                target="_blank"
                rel="noreferrer"
                className="role-modal__wiki-btn"
              >
                <i className="fa fa-external-link-alt" /> Aktyor haqqında ətraflı
              </a>
            )}

            <Review personId={id} personName={content} />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
