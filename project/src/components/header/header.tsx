import React from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {getAuthorizationStatus, getUser} from '../../store/auth/selectors';
import {logoutAction} from '../../store/auth/api';
import {getFavoritePlaces} from '../../store/places/selectors';

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoritePlaces = useAppSelector(getFavoritePlaces);

  const handleSignOutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth ?
                  <>
                    <li className="header__nav-item user">
                      <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">{user?.email}</span>
                        <span className="header__favorite-count">{favoritePlaces.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        to="/login"
                        className="header__nav-link"
                        onClick={handleSignOutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </> :
                  <li className="header__nav-item user">
                    <Link to="/login" className="header__nav-link">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
