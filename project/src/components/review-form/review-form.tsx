import {ChangeEvent, useState} from 'react';
import {Rating} from '../../types/raiting.type';

type Props = {
  ratings: Rating[];
};

enum ReviewLength {
  MIN = 50,
  MAX = 300
}

export function ReviewForm({ratings}: Props): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '0',
    review: '',
  });

  const handleFormFieldChange = (name: string, value: number | string) => {
    setFormData({...formData, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          ratings.map((rating) =>
            (
              <div key={rating.id}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={rating.value}
                  id={rating.id}
                  type="radio"
                  onClick={({currentTarget}) => {
                    handleFormFieldChange(currentTarget.name, rating.value);
                  }}
                />
                <label htmlFor={rating.id} className="reviews__rating-label form__rating-label" title={rating.title}>
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star" />
                  </svg>
                </label>
              </div>
            )
          )
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
          const {name, value} = evt.target;
          handleFormFieldChange(name, value);
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            formData.rating === '0' &&
            (formData.review.length < ReviewLength.MIN || formData.review.length > ReviewLength.MAX)
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
