import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import SvgSprite from '../../components/svg-sprite/svg-sprite';

function Login(): JSX.Element {
  return (
    <>
      <SvgSprite />

      <div className="page page--gray page--login">
        <Header user={{email: '', favoritePlacesCount: 0}} />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <LoginForm />
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <Link to="/" className="locations__item-link">
                  <span>Amsterdam</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
