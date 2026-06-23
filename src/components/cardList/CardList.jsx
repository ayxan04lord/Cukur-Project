import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../card/Card';
import './CardList.css';

const SEASONS = [1, 2, 3, 4];

const CardList = () => {
  const { persons, personsLoading, personsError } = useSelector((s) => s.content);

  const [search,       setSearch]       = useState('');
  const [seasonFilter, setSeasonFilter] = useState(null);
  const [roleFilter,   setRoleFilter]   = useState('all');

  // Backend-dən gələn field adları: actor_name, role_name, role_type, seasons (num[])
  const filtered = persons.filter((p) => {
    const matchSearch =
      p.actor_name.toLowerCase().includes(search.toLowerCase()) ||
      p.role_name.toLowerCase().includes(search.toLowerCase());

    const matchSeason = seasonFilter === null
      ? true
      : Array.isArray(p.seasons) && p.seasons.includes(seasonFilter);

    const matchRole = roleFilter === 'all' ? true : p.role_type === roleFilter;

    return matchSearch && matchSeason && matchRole;
  });

  const activeFilterCount =
    (seasonFilter !== null ? 1 : 0) + (roleFilter !== 'all' ? 1 : 0);

  const clearFilters = () => {
    setSeasonFilter(null);
    setRoleFilter('all');
    setSearch('');
  };

  if (personsLoading) {
    return (
      <section className="cardlist">
        <div className="cardlist__loading">
          <i className="fa fa-spinner fa-spin" /> Personajlar yüklənir...
        </div>
      </section>
    );
  }

  if (personsError) {
    return (
      <section className="cardlist">
        <div className="cardlist__error">
          <i className="fa fa-exclamation-triangle" /> Server ilə əlaqə qurulmadı: {personsError}
        </div>
      </section>
    );
  }

  return (
    <section className="cardlist">
      <div className="cardlist__header">
        <h2 className="cardlist__title">Personajlar</h2>
        <div className="cardlist__controls">
          <div className="cardlist__search">
            <i className="fa fa-search" />
            <input
              type="text"
              placeholder="Ad və ya rol axtar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Personaj axtar"
            />
            {search && (
              <button className="cardlist__clear-x" onClick={() => setSearch('')} aria-label="Axtarışı sil">
                <i className="fa fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filterlər */}
      <div className="cardlist__filters">
        <div className="filter-group">
          <span className="filter-group__label"><i className="fa fa-film" /> Mövsüm:</span>
          <button
            className={`filter-btn ${seasonFilter === null ? 'active' : ''}`}
            onClick={() => setSeasonFilter(null)}
          >
            Hamısı
          </button>
          {SEASONS.map((s) => (
            <button
              key={s}
              className={`filter-btn ${seasonFilter === s ? 'active' : ''}`}
              onClick={() => setSeasonFilter(seasonFilter === s ? null : s)}
            >
              {s}. Mövsüm
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-group__label"><i className="fa fa-theater-masks" /> Rol:</span>
          {[
            { val: 'all',         label: 'Hamısı' },
            { val: 'protagonist', label: '⚔ Qəhrəman' },
            { val: 'antagonist',  label: '💀 Antagonist' },
          ].map(({ val, label }) => (
            <button
              key={val}
              className={`filter-btn ${roleFilter === val ? 'active' : ''}`}
              onClick={() => setRoleFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeFilterCount > 0 && (
          <button className="filter-clear-btn" onClick={clearFilters}>
            <i className="fa fa-times" /> Filterləri sıfırla ({activeFilterCount})
          </button>
        )}
      </div>

      <p className="cardlist__count">{filtered.length} personaj tapıldı</p>

      {filtered.length === 0 ? (
        <p className="cardlist__empty">Heç bir nəticə tapılmadı.</p>
      ) : (
        <div className="cardlist__grid">
          {filtered.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              title={p.actor_name}
              content={p.role_name}
              image={p.image}
              wikipedia={p.wikipedia}
              roleInfo={p.role_info}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CardList;
