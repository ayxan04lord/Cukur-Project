import { useSelector } from 'react-redux';
import './Products.css';

const Products = () => {
  const { seasons, seasonsLoading, seasonsError } = useSelector((s) => s.content);

  if (seasonsLoading) {
    return (
      <main className="seasons">
        <div className="seasons__header">
          <h1>Mövsümlər</h1>
        </div>
        <div className="seasons__loading">
          <i className="fa fa-spinner fa-spin" /> Mövsümlər yüklənir...
        </div>
      </main>
    );
  }

  if (seasonsError) {
    return (
      <main className="seasons">
        <div className="seasons__header"><h1>Mövsümlər</h1></div>
        <div className="seasons__error">
          <i className="fa fa-exclamation-triangle" /> Server xətası: {seasonsError}
        </div>
      </main>
    );
  }

  const totalEpisodes = seasons.reduce((sum, s) => sum + s.episodes, 0);

  return (
    <main className="seasons">
      <div className="seasons__header">
        <h1>Mövsümlər</h1>
        <p>{seasons.length} mövsüm, {totalEpisodes} bölüm — Çukur'un bütün hekayəsi</p>
      </div>

      <div className="seasons__grid">
        {seasons.map((s) => (
          <div className="season-card" key={s.id}>
            <div className="season-card__img-wrap">
              <img src={s.image} alt={`Sezon ${s.num}`} />
              <div className="season-card__overlay" />
              <span className="season-card__badge">SEZON {s.num}</span>
            </div>
            <div className="season-card__body">
              <div className="season-card__meta">
                <span><i className="fa fa-calendar" /> {s.year}</span>
                <span><i className="fa fa-film" /> {s.episodes} Bölüm</span>
              </div>
              <p className="season-card__desc">{s.desc}</p>
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="season-card__btn"
              >
                <i className="fab fa-youtube" /> YouTube-da izlə
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
