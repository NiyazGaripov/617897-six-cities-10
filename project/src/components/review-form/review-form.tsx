import {FormEvent} from 'react';
import {RatingFormControl} from '../rating-form-control/rating-form-control';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useFormField} from '../../hooks/useFormField';
import {addNewCommentAction} from '../../store/comments/api';
import {getError, getLoadingStatus} from '../../store/comments/selectors';
import styles from './review-form.module.css';

enum ReviewLength {
  MIN = 50,
  MAX = 300
}

type Rating = {
  value: number;
  title: string;
};

const RATINGS: Rating[] = [
  {
    value: 5,
    title: 'perfect',
  },
  {
    value: 4,
    title: 'good',
  },
  {
    value: 3,
    title: 'not bad',
  },
  {
    value: 2,
    title: 'badly',
  },
  {
    value: 1,
    title: 'terribly',
  },
];

type Props = {
  id: number;
}

export function ReviewForm({id}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(getLoadingStatus);
  const isError = useAppSelector(getError);
  const rating = useFormField('',{ allowEmpty: true });
  const comment = useFormField('',{ allowEmpty: true, minLength: ReviewLength.MIN, maxLength: ReviewLength.MAX,});

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(addNewCommentAction({
      id: id,
      comment: comment.value,
      rating: Number(rating.value),
    }));
    rating.reset();
    comment.reset();
  };

  return (
    <form
      className={`reviews__form form ${isError && styles.formError}`}
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className={`reviews__rating-form form__rating ${isError && styles.fieldError}`}>
        {
          RATINGS.map(({value, title}) =>
            (
              <RatingFormControl
                key={value}
                value={value}
                title={title}
                onFormFieldChange={rating.onChange}
                currentValue={Number(rating.value)}
                loadingStatus={loadingStatus}
              />
            )
          )
        }
      </div>

      <textarea
        className={`reviews__textarea form__textarea  ${isError && styles.fieldError}`}
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment.value}
        onChange={comment.onChange}
        disabled={loadingStatus}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating.valid.inputValid || !comment.valid.inputValid || loadingStatus}
        >
          {loadingStatus ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
