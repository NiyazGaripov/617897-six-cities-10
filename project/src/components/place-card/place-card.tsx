import {Link} from 'react-router-dom';
import {Hotel} from '../../types/hotel.type';
import {transformRatingToPercentage} from '../../utils/common';

type Props = {
  hotel: Hotel
  className: string;
  onPlaceCardEnter?: (id: number) => void;
  onPlaceCardLeave?: () => void;
};

export function PlaceCard({hotel, className, onPlaceCardEnter, onPlaceCardLeave}: Props): JSX.Element {
  const { id, isFavorite, isPremium, previewImage, price, rating, title, type } = hotel;
  const isBookmarkActive: string = isFavorite ? 'place-card__bookmark-button--active' : '';

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={() => onPlaceCardEnter?.(id)}
      onMouseLeave={() => onPlaceCardLeave?.()}
    >
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <Link to="/offer/1">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`${className}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price} </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isBookmarkActive} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: transformRatingToPercentage(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="/offer/1">
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
