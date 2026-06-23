import './About.css';

const About = () => {
  return (
    <main className="about">
      <div className="about__hero">
        <img src="/img/Çukur.jpg" alt="Çukur" className="about__hero-img" />
        <div className="about__hero-overlay" />
        <div className="about__hero-text">
          <h1>Çukur Haqqında</h1>
          <p>2017 – 2021</p>
        </div>
      </div>

      <div className="about__content">
        <div className="about__block">
          <h2>Serial Haqqında</h2>
          <p>
            Çukur, Gökhan Horzum tərəfindən yazılmış, Türkiyənin Star TV kanalında yayımlanan bir
            Türk televiziya seriyasıdır. Serial 2017-ci ildən 2021-ci ilə qədər 4 mövsüm davam
            etmişdir.
          </p>
          <p>
            Tarix boyu Koçovalı ailəsinə məxsus olan İstanbul'un qaranlıq bir məhəlləsini — Çukur'u
            geri qazanmaq üçün verilen mübarizəni izləyirik. Yamaç Koçovalı, sevgilisi Sena ilə
            birlikdə Çukur'a qayıdır və ailəsinin düşdüyü çətin vəziyyəti aradan qaldırmağa çalışır.
          </p>
        </div>

        <div className="about__stats">
          <div className="about__stat">
            <span className="about__stat-num">4</span>
            <span className="about__stat-label">Mövsüm</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-num">131</span>
            <span className="about__stat-label">Bölüm</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-num">35+</span>
            <span className="about__stat-label">Personaj</span>
          </div>
          <div className="about__stat">
            <span className="about__stat-num">2017</span>
            <span className="about__stat-label">Başlanğıc</span>
          </div>
        </div>

        <div className="about__block">
          <h2>Baş Rollarda</h2>
          <ul className="about__cast">
            <li><span>Aras Bulut İynemli</span> — Yamaç Koçovalı</li>
            <li><span>Dilan Çiçek Deniz</span> — Sena Koçovalı</li>
            <li><span>Ercan Kesal</span> — İdris Koçovalı</li>
            <li><span>Perihan Savaş</span> — Sultan Koçovalı</li>
            <li><span>Necip Memili</span> — Cumali Koçovalı</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default About;
