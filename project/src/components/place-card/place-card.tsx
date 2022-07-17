import {Link} from 'react-router-dom';

type Props = {
  template: 'cities' | 'favorites';
  isFavorite: boolean;
  isPremium: boolean;
  previewImage: string;
  price: number;
  title: string;
  type: string;
};

export function PlaceCard({template, isFavorite, isPremium, previewImage, price, title, type}: Props): JSX.Element {
  const isBookmarkActive: string = isFavorite ? 'place-card__bookmark-button--active' : '';
  const citiesTemplate: string = template;

  return (
    <article className={`${citiesTemplate}__card place-card`}>
      {
        isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className={`${citiesTemplate}__image-wrapper place-card__image-wrapper`}>
        <Link to="/offer/1">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className={`${citiesTemplate}__card-info place-card__info`}>
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
            <span style={{width: '80%'}}></span>
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
