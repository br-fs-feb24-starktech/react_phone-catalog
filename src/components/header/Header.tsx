import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { useAppContext } from '../../context/AppContext';
import { useAuthContext } from '../../context/useAuthContext';
import { useHandleMenuItemClick } from '../../hooks/useHandleMenuItemClick';

interface Props {
  lightTheme: boolean;
  changeTheme: () => void;
}

export const Header: React.FC<Props> = ({ lightTheme, changeTheme }) => {
  const { selectedNavItem, setSelectedMenu, selectedMenu } = useAppContext();
  const { user, logout } = useAuthContext();
  const [cartCounter, setCartCounter] = useState(3);
  const [favoriteCounter, setFavoriteCounter] = useState(5);

  const { favorites, cart } = useAppContext();
  const handleMenuItemClick = useHandleMenuItemClick();

  const logo = lightTheme
    ? `${import.meta.env.VITE_API_URL}/img/icons/logo-light.svg`
    : `${import.meta.env.VITE_API_URL}/img/icons/logo.svg`;

  useEffect(() => {
    setFavoriteCounter(favorites.length);
    setCartCounter(cart.length);
  }, [favorites, cart]);

  const handleExitMenu = () => {
    setSelectedMenu(false);
  };

  const handleOpenMenu = () => {
    setSelectedMenu(true);
  };

  useEffect(() => {
    if (selectedMenu) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [selectedMenu]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__left-part left-part">
            <Link to="/" className="header__logo">
              <img src={logo} alt="logo" />
            </Link>

            <nav className="nav header__nav">
              <ul className="nav__list">
                {['Home', 'Phones', 'Tablets', 'Accessories'].map(page => (
                  <li key={page} className="nav__item">
                    <Link
                      to={`/${page.toLowerCase()}`}
                      className={`nav__link ${selectedNavItem === page ? 'is-active' : ''}`}
                      onClick={() => handleMenuItemClick(page)}
                    >
                      {page}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="header__right-part right-part">
            <label className="switch">
              <input type="checkbox" checked={lightTheme} onChange={changeTheme} />
              <span className="slider round"></span>
            </label>
            <div className="right-part__login">
              {user ? (
                <div className="user-info">
                  <span className="right-part__user-name">Hi, {user.name}</span>
                  <button onClick={logout} className="right-part__login-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="right-part__login-btn">
                  Login
                </Link>
              )}
            </div>
            <div className="right-part__item-box">
              <Link
                to="/favourites"
                className={`right-part__icon right-part__icon--favorite ${selectedNavItem === 'Favourites' ? 'is-active' : ''}`}
              >
                {favoriteCounter ? (
                  <div className="right-part__icon--counter">{favoriteCounter}</div>
                ) : (
                  ''
                )}
              </Link>
            </div>

            <div className="right-part__item-box">
              <Link
                to="/cart"
                className={`right-part__icon right-part__icon--cart ${selectedNavItem === 'Cart' ? 'is-active' : ''}`}
              >
                {cartCounter ? <div className="right-part__icon--counter">{cartCounter}</div> : ''}
              </Link>
            </div>

            {selectedMenu ? (
              <div className="right-part__item-box">
                <div
                  className={`right-part__icon right-part__icon--close`}
                  onClick={handleExitMenu}
                ></div>
              </div>
            ) : (
              <div className="right-part__item-box">
                <div
                  className={`right-part__icon right-part__icon--menu-burger ${selectedNavItem === 'Menu' ? 'is-active' : ''}`}
                  onClick={handleOpenMenu}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
