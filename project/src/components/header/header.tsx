import {Link} from 'react-router-dom';
import HeaderProps from './header.type';

function Header({user}: HeaderProps): JSX.Element {
  const isAuth = user.email !== '';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          {
            isAuth ?
              <>
                <div className="header__left">
                  <Link to="/" className="header__logo-link header__logo-link--active">
                    <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                  </Link>
                </div>
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{user.favoritePlacesCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link to="/login" className="header__nav-link">
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </> :
              <div className="header__left">
                <Link to="/" className="header__logo-link">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
