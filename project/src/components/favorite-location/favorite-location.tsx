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
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favoritesPlaces}
      </div>
    </li>

  );
}

export default FavoriteLocation;
