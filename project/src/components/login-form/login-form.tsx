import {FormEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {useFormField} from '../../hooks/useFormField';
import {loginAction} from '../../store/auth/api';

export function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const email = useFormField('',{ allowEmpty: true, isEmail: true });
  const password = useFormField('',{ allowEmpty: true, minLength: 2, isPassword: true });

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(loginAction({ email: email.value, password: password.value }));
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
        />
        { (email.isDirty && email.valid.allowEmpty) && <p style={{color: 'red'}}>The field cannot be empty</p> }
        { (email.isDirty && email.valid.emailError) && <p style={{color: 'red'}}>Enter a valid email address</p> }
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        { (password.isDirty && password.valid.allowEmpty) && <p style={{color: 'red'}}>The field cannot be empty</p> }
        { (password.isDirty && password.valid.passwordError) && <p style={{color: 'red'}}>Password must consist of at least one letter and one number</p> }
        { (password.isDirty && password.valid.minLengthError) && <p style={{color: 'red'}}>The password must be at least 2 characters long</p> }
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!email.valid.inputValid || !password.valid.inputValid}
      >
        Sign in
      </button>
    </form>
  );
}
