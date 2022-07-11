import User from '../../types/user.type';
import Hotel from '../../types/hotel.type';
import Comment from '../../types/comment.type';

type PropertyProps = {
  isAuth: boolean;
  user: User;
  hotel: Hotel;
  comments: Comment[];
  nearbyHotels: Hotel[];
};

export default PropertyProps;
