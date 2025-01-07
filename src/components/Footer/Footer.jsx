import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© {new Date().getFullYear()} Adornate con amor'Handmade products with lots of love'.</p>
        <nav className="footer__nav">
          <a href="/home" className="footer__link">Home</a>
          <a href="/products" className="footer__link">Products</a>
          <a href="/profile" className="footer__link">Profile</a>
          <a href="/cart" className="footer__link">Cart</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
