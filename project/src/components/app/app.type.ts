import Hotel from '../../types/hotel.type';
import User from '../../types/user.type';

type AppProps = {
  hotels: Hotel[];
  cities: string[];
  placesCount: number;
  user: User;
};

export default AppProps;
