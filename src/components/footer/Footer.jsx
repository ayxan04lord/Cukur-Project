import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>Contact Us</h3>
          <p>Email: ayxan.com</p>
          <p>Phone: +994556772714</p>
          <p>Address: Baku, Azerbaijan</p>
        </div>
        <div className="social-links">
          <h3>Follow Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
