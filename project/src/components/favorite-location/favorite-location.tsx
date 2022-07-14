import {Link} from 'react-router-dom';
import FavoriteLocationProps from './favorite-location.type';
import Hotel from '../../types/hotel.type';
import PlaceCard from '../place-card/place-card';

function FavoriteLocation({city, hotels}: FavoriteLocationProps):JSX.Element {
  const favoritesPlaces = hotels.map((hotel: Hotel): JSX.Element =>
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
  );

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={`/${city}`} className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favoritesPlaces}
      </div>
    </li>

  );
}

export default FavoriteLocation;
