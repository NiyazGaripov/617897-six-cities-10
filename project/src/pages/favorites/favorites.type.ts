import User from '../../types/user.type';
import Hotel from '../../types/hotel.type';

type FavoriteLocation = {
  city: string;
  hotels: Hotel[];
};

type FavoritesProps = {
  user: User;
  locations: FavoriteLocation[];
};

export default FavoritesProps;
