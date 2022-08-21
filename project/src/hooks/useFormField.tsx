import React, {ChangeEvent, useCallback, useState} from 'react';
import {useValidation} from './useValidation';

type FormField = {
  value: string
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDirty: boolean,
  valid: Record<string, string | number | boolean>,
}

export function useFormField(initialValue: string, validators: Record<string, string | number | boolean>): FormField {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validators);

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => setValue(evt.target.value), []);
  const onBlur = useCallback((evt: ChangeEvent<HTMLInputElement>) => setDirty(true), []);

  return { value, onChange, onBlur, isDirty, valid };
}
