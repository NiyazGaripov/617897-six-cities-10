import {ChangeEvent} from 'react';

type Props = {
  value: number;
  title: string;
  onFormFieldChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  currentValue: number;
}

export function RatingFormControl({value, title, onFormFieldChange, currentValue}: Props): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        onChange={onFormFieldChange}
        checked={value === currentValue}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}
