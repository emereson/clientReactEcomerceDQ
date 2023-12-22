import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pagesStyle/header.css';
import Cart from './Cart';

const Header = () => {
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);
  const [openCart, setopenCart] = useState(false);

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
          </li>
        </ul>
        <section className="header__section">
          {!userData ? (
            <i className="icon icon-user"></i>
          ) : (
            <img src={userData?.user.userImg} alt="" />
          )}
        </section>
      </div>
      <Cart setopenCart={setopenCart} openCart={openCart} />
    </header>
  );
};

export default Header;
