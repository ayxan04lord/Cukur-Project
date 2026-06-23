import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/img/logo.jpg" alt="Çukur Logo" />
          <span>ÇUKUR</span>
          <p>2017 – 2021 · Star TV</p>
        </div>

        <div className="footer__col">
          <h4>Əlaqə</h4>
          <p><i className="fa fa-envelope" /> ayxan@çukur.com</p>
          <p><i className="fa fa-phone" /> +994 55 677 27 14</p>
          <p><i className="fa fa-map-marker" /> Bakı, Azərbaycan</p>
        </div>

        <div className="footer__col">
          <h4>Keçidlər</h4>
          <a href="/">Ana Səhifə</a>
          <a href="/products">Mövsümlər</a>
          <a href="/about">Haqqında</a>
          <a href="/contact">Əlaqə</a>
        </div>

        <div className="footer__col">
          <h4>Sosial Media</h4>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Çukur Fan Layihəsi. Bütün hüquqlar qorunur.</p>
        <p>❤️ Ayxan tərəfindən hazırlanmışdır</p>
      </div>
    </footer>
  );
};

export default Footer;
