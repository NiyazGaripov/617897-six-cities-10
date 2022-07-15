import Rating from '../../types/raiting.type';

type Props = {
  ratings: Rating[];
};

function ReviewForm({ratings}: Props): JSX.Element {
  const inputs = ratings.map((rating: Rating): JSX.Element =>
    (
      <div key={rating.id}>
        <input className="form__rating-input visually-hidden" name="rating" value={rating.value} id={rating.id} type="radio" />
        <label htmlFor={rating.id} className="reviews__rating-label form__rating-label" title={rating.title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
    )
  );

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {inputs}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
