import { useSelector, useDispatch } from 'react-redux';
import { toggleLike, toggleLikeThunk } from '../../../store/card/cardReducer';
import './LikedItems.css';

const LikedItems = () => {
  const dispatch  = useDispatch();
  const likedIds  = useSelector((s) => s.card.likedItems);
  const persons   = useSelector((s) => s.content.persons);   // backend-dən gəlir
  const currentUser = useSelector((s) => s.auth.currentUser);

  // Backend field adları: actor_name, role_name
  const liked = persons.filter((p) => likedIds.includes(p.id));

  const handleRemove = (id) => {
    dispatch(toggleLike(id));                                  // optimistik
    if (currentUser) dispatch(toggleLikeThunk(id));           // server sync
  };

  if (liked.length === 0) {
    return (
      <div className="items-page">
        <div className="items-page__header">
          <h1><i className="fa fa-heart" /> Bəyənilənlər</h1>
        </div>
        <div className="items-page__empty">
          <i className="fa-regular fa-heart" />
          <p>Hələ heç bir personaj bəyənilməyib.</p>
          <a href="/" className="items-page__back">Ana Səhifəyə Qayıt</a>
        </div>
      </div>
    );
  }

  return (
    <div className="items-page">
      <div className="items-page__header">
        <h1><i className="fa fa-heart" /> Bəyənilənlər</h1>
        <span className="items-page__count">{liked.length} personaj</span>
      </div>
      <div className="items-page__grid">
        {liked.map((item) => (
          <div className="items-page__row" key={item.id}>
            <img src={item.image} alt={item.actor_name} className="items-page__avatar" />
            <div className="items-page__info">
              <p className="items-page__name">{item.actor_name}</p>
              <p className="items-page__role">{item.role_name}</p>
            </div>
            <button
              className="items-page__remove"
              onClick={() => handleRemove(item.id)}
              aria-label="Sil"
            >
              <i className="fa fa-times" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedItems;
