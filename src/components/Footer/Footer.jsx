import React from "react";
import "./Footer.scss"; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© {new Date().getFullYear()} Adornate con amor 'Productos Hechos a mano con mucho amor'.</p>
        <nav className="footer__nav">
          <a href="/home" className="footer__link">Inicio</a>
          <a href="/products" className="footer__link">Productos</a>
          <a href="/profile" className="footer__link">Perfil</a>
          <a href="/cart" className="footer__link">Carrito</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
