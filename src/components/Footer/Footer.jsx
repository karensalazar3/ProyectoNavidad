import React from "react";
import "./Footer.scss"; // Asegúrate de tener el archivo SCSS enlazado

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">© {new Date().getFullYear()} E-commerce App. Todos los derechos reservados.</p>
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
