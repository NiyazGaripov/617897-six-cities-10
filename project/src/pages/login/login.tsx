import {Header} from '../../components/header/header';
import {LoginForm} from '../../components/login-form/login-form';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {RandomLocation} from '../../components/random-location/random-location';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/auth/selectors';
import {useEffect} from 'react';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {redirectToRoute} from '../../store/actions';

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  }, [authorizationStatus]);

  return (
    <>
      <SvgSprite />

      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <LoginForm />
            </section>
            <RandomLocation />
          </div>
        </main>
      </div>
    </>
  );
}
