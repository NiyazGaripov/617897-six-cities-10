import HOTELS from './hotels.const';

// TODO specify type for FAVORITE_LOCATIONS
const FAVORITE_LOCATIONS = [
  {
    city: 'Amsterdam',
    hotels: HOTELS.filter((hotel) => hotel.isFavorite),
  }
];

export default FAVORITE_LOCATIONS;
