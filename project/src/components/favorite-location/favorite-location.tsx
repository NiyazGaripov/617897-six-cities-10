import {Link} from 'react-router-dom';
import {City, Hotel} from '../../types/hotel.type';
import {PlaceCard} from '../place-card/place-card';

type Props = {
  city: City;
  hotels: Hotel[];
};

export function FavoriteLocation({city, hotels}: Props): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={`/${city.name.toLowerCase()}`} className="locations__item-link">
            <span>{city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          hotels.map((hotel) =>
            (
              <PlaceCard
                key={hotel.id}
                hotel={hotel}
                className='favorites'
              />
            )
          )
        }
      </div>
    </li>
  );
}
