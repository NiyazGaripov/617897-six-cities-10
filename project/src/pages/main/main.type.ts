import Hotel from '../../types/hotel.type';
import User from '../../types/user.type';

type MainProps = {
  hotels: Hotel[];
  cities: string[];
  placesCount: number;
  user: User;
};

export default MainProps;
