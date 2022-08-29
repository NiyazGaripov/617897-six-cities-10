import {Link} from 'react-router-dom';
import {PlaceCard} from '../place-card/place-card';
import {useAppSelector} from '../../hooks';
import {getFavoritePlacesByCity} from '../../store/places/selectors';

export function FavoriteLocation(): JSX.Element {
  const favoritePlaces = useAppSelector(getFavoritePlacesByCity);

  return (
    <ul className="favorites__list">
      {
        Object.entries(favoritePlaces).map(([city, places]) => (
          <li
            key={city}
            className="favorites__locations-items"
          >
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link to={`/${city.toLowerCase()}`} className="locations__item-link">
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {
                places.map((place) =>
                  (
                    <PlaceCard
                      key={place.id}
                      hotel={place}
                      className='favorites'
                    />
                  )
                )
              }
            </div>
          </li>
        ))
      }
    </ul>
  );
}
