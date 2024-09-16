import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content row">
        <div className="contact-info col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <h3>Contact Us</h3>
          <p>Email: ayxan.com</p>
          <p>Phone: +994556772714</p>
          <p>Address: Baku, Azerbaijan</p>
        </div>

        <div className="office-info col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <h3>Office</h3>
          <p>Email: office@ayxan.com</p>
          <p>Phone: +994123456789</p>
          <p>Address: Tbilisi, Georgia</p>
        </div>

        <div className="support-info col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
          <h3>Support</h3>
          <p>Email: support@ayxan.com</p>
          <p>Phone: +994987654321</p>
          <p>Address: Istanbul, Turkey</p>
        </div>

        <div className="social-links col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
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
