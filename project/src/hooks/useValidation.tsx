import {useEffect, useState} from 'react';

const validateEmail = (email: string) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const validatePassword = (password: string) => String(password)
  .toLowerCase()
  .match(
    /[a-zA-Z]+[0-9]|[0-9]+[a-zA-z]/
  );

export function useValidation(value: string, validators: Record<string, string | number | boolean>) {
  const [isEmpty, setEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          validateEmail(value) ? setEmailError(false) : setEmailError(true);
          break;
        case 'isPassword':
          validatePassword(value) ? setPasswordError(false) : setPasswordError(true);
          break;
        case 'minLength':
          value.length < validators[validator] ? setMinLengthError(true) : setMinLengthError(false);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || emailError || passwordError || minLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, emailError, passwordError, minLengthError]);

  return { isEmpty, emailError, passwordError, minLengthError, inputValid };
}
