import React, {ChangeEvent, useCallback, useState} from 'react';
import {useValidation, Validator} from './useValidation';

type FormField = {
  value: string
  onChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDirty: boolean,
  valid: Record<string, string | number | boolean>,
  reset: () => void,
}

export function useFormField(initialValue: string, validators: Validator): FormField {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validators);

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(evt.target.value), []);
  const onBlur = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDirty(true), []);
  const reset = () => setValue('');

  return { value, onChange, onBlur, isDirty, valid, reset };
}
