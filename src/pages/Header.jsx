import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pagesStyle/header.css';
import Cart from './Cart';
import { useSelector } from 'react-redux';

const Header = ({ userData }) => {
  const [openCart, setopenCart] = useState(false);
  const cartData = useSelector((state) => state.cart);

  return (
    <header className="header__container">
      <div className="header__divContainer">
        <img src="./logo.svg" alt="logo DonQuezo" className="header__logoImg" />
        <ul className="header__ul">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/ordenar">Ordenar</Link>
          </li>
          <li>
            <Link to="/faq">Faq</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <a href="tel:+51987407185">
              <i className="icon icon-support"></i>
            </a>
          </li>

          <li onClick={() => setopenCart(!openCart)}>
            <i className="icon icon-shopping-cart2"></i>
            <span className="header__cartCounter">{cartData?.length}</span>
          </li>
        </ul>
        <section className="header__section">
          {!userData ? (
            <i className="icon icon-user"></i>
          ) : (
            <img src={userData?.clientImg} alt="" />
          )}
        </section>
      </div>
      <Cart setopenCart={setopenCart} openCart={openCart} cartData={cartData} />
    </header>
  );
};

export default Header;
