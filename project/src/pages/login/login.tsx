import {Header} from '../../components/header/header';
import {LoginForm} from '../../components/login-form/login-form';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {RandomLocation} from '../../components/random-location/random-location';

export function Login(): JSX.Element {
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
