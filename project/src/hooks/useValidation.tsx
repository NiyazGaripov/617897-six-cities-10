import {useEffect, useState} from 'react';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEXP = /[a-zA-Z]+[0-9]|[0-9]+[a-zA-z]/;

const isValidEmail = (email: string) => email
  .toLowerCase()
  .match(EMAIL_REGEXP);

const isValidPassword = (password: string) => password
  .toLowerCase()
  .match(PASSWORD_REGEXP);

export type Validator = {
  allowEmpty?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
  minLength?: number;
  maxLength?: number;
};

export function useValidation(value: string, validators: Validator) {
  const [allowEmpty, setEmpty] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'allowEmpty':
          setEmpty(!value);
          break;
        case 'isEmail':
          setEmailError(!isValidEmail(value));
          break;
        case 'isPassword':
          setPasswordError(!isValidPassword(value));
          break;
        case 'minLength':
          if (validators.minLength) {
            setMinLengthError(value.length < validators.minLength);
          }
          break;
        case 'maxLength':
          if (validators.maxLength) {
            setMaxLengthError(value.length > validators.maxLength);
          }
          break;
      }
    }
  }, [value, validators]);

  useEffect(() => {
    setInputValid(!(allowEmpty || emailError || passwordError || minLengthError || maxLengthError));
  }, [allowEmpty, emailError, passwordError, minLengthError, maxLengthError]);

  return { allowEmpty, emailError, passwordError, minLengthError, maxLengthError, inputValid };
}
