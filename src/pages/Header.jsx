import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pagesStyle/header.css';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Header = ({ userData }) => {
  const cartData = useSelector((state) => state.cart);
  const [openCart, setopenCart] = useState(false);
  const [allSections, setallSections] = useState();
  const [openSections, setopenSections] = useState(false);
  const [openPerfil, setopenPerfil] = useState(false);

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}/section-product`;

    axios
      .get(url)
      .then((res) => setallSections(res.data.sectionProducts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="header__container">
      <div className="header__divContainer">
        <img src="./logo.svg" alt="logo DonQuezo" className="header__logoImg" />
        <ul className="header__ul">
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li
            className="header__liSections"
            onMouseEnter={() => setopenSections(true)}
            onMouseLeave={() => setopenSections(false)}
          >
            <p>
              Secciones <i className="bx bx-chevron-down"></i>
            </p>
            <div
              className={`header__liSections__div  ${
                openSections ? '' : 'header__liSections__closeSections'
              }`}
            >
              {allSections?.map((section) => (
                <Link key={section.id} to={`/seccion/${section.id}`}>
                  {section.name} <i className="bx bx-chevron-right"></i>
                </Link>
              ))}
            </div>
          </li>
          <li>
            <Link to="/zonas-de-reparto">Zonas de Reparto</Link>
          </li>
          <li>
            <Link to="/contacts">Contacto</Link>
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
          <li
            className="header__profile"
            onMouseEnter={() => setopenPerfil(true)}
            onMouseLeave={() => setopenPerfil(false)}
          >
            {!userData ? (
              <i className="icon icon-user"></i>
            ) : (
              <img src={userData?.clientImg} alt="" />
            )}
            {userData ? (
              <div
                className={`header__profile__div  ${
                  openPerfil ? '' : 'header__closeProfile'
                }`}
              >
                <Link to={`/mi-perfil`}>
                  Ver Perfil <i className="bx bx-chevron-right"></i>
                </Link>
                <Link
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Cerrar Sesión <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            ) : (
              <div
                className={`header__profile__div  ${
                  openPerfil ? '' : 'header__closeProfile'
                }`}
              >
                <Link to={`/log-in`}>
                  Ingresar <i className="bx bx-chevron-right"></i>
                </Link>
                <Link to={`/register`}>
                  Registrame <i className="bx bx-chevron-right"></i>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
      <Cart setopenCart={setopenCart} openCart={openCart} cartData={cartData} />
    </header>
  );
};

export default Header;
