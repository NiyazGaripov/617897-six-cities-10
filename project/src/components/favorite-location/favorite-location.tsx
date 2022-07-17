import {Link} from 'react-router-dom';
import {Hotel} from '../../types/hotel.type';
import {PlaceCard} from '../place-card/place-card';
import {changeStringToLowerCase} from '../../utils/common';

type Props = {
  city: string;
  hotels: Hotel[];
};

export function FavoriteLocation({city, hotels}: Props): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={`/${changeStringToLowerCase(city)}`} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          hotels.map((hotel) =>
            (
              <PlaceCard
                key={hotel.id}
                template='favorites'
                isFavorite={hotel.isFavorite}
                isPremium={hotel.isPremium}
                previewImage={hotel.previewImage}
                price={hotel.price}
                title={hotel.title}
                type={hotel.type}
              />
            )
          )
        }
      </div>
    </li>
  );
}
