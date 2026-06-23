import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <main className="contact">
      <div className="contact__header">
        <h1>Əlaqə</h1>
        <p>Hər hansı bir sual və ya təklif üçün bizimlə əlaqə saxlayın.</p>
      </div>

      <div className="contact__body">
        <div className="contact__info">
          <div className="contact__info-item">
            <i className="fa fa-map-marker-alt" />
            <div>
              <h4>Ünvan</h4>
              <p>Bakı, Azərbaycan</p>
            </div>
          </div>
          <div className="contact__info-item">
            <i className="fa fa-envelope" />
            <div>
              <h4>E-poçt</h4>
              <p>ayxan@çukur.com</p>
            </div>
          </div>
          <div className="contact__info-item">
            <i className="fa fa-phone" />
            <div>
              <h4>Telefon</h4>
              <p>+994 55 677 27 14</p>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          {sent && (
            <div className="contact__success">
              <i className="fa fa-check-circle" /> Mesajınız göndərildi, tezliklə cavab verəcəyik!
            </div>
          )}
          <div className="contact__field">
            <label htmlFor="name">Adınız</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Adınızı daxil edin"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact__field">
            <label htmlFor="email">E-poçt</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-poçt ünvanınızı daxil edin"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact__field">
            <label htmlFor="message">Mesaj</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Mesajınızı yazın..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="contact__submit">
            Göndər <i className="fa fa-paper-plane" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
