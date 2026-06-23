import { useSelector, useDispatch } from 'react-redux';
import { toggleBasket, toggleBasketThunk } from '../../../store/card/cardReducer';
import './BasketItems.css';

const BasketItems = () => {
  const dispatch    = useDispatch();
  const basketIds   = useSelector((s) => s.card.basketItems);
  const persons     = useSelector((s) => s.content.persons);  // backend-dən gəlir
  const currentUser = useSelector((s) => s.auth.currentUser);

  const inBasket = persons.filter((p) => basketIds.includes(p.id));

  const handleRemove = (id) => {
    dispatch(toggleBasket(id));                                 // optimistik
    if (currentUser) dispatch(toggleBasketThunk(id));          // server sync
  };

  if (inBasket.length === 0) {
    return (
      <div className="items-page">
        <div className="items-page__header">
          <h1><i className="fa fa-shopping-basket" /> Səbət</h1>
        </div>
        <div className="items-page__empty">
          <i className="fa fa-shopping-basket" />
          <p>Səbətiniz boşdur.</p>
          <a href="/" className="items-page__back">Ana Səhifəyə Qayıt</a>
        </div>
      </div>
    );
  }

  return (
    <div className="items-page">
      <div className="items-page__header">
        <h1><i className="fa fa-shopping-basket" /> Səbət</h1>
        <span className="items-page__count">{inBasket.length} personaj</span>
      </div>
      <div className="items-page__grid">
        {inBasket.map((item) => (
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

export default BasketItems;
