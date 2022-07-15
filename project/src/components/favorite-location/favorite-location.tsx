import {Link} from 'react-router-dom';
import {Hotel} from '../../types/hotel.type';
import PlaceCard from '../place-card/place-card';
import {changeStringToLowerCase} from '../../utils/common';

type Props = {
  city: string;
  hotels: Hotel[];
};

function FavoriteLocation({city, hotels}: Props):JSX.Element {
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
          <Link to={`/${changeStringToLowerCase(city)}`} className="locations__item-link">
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
