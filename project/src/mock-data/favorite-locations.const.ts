import {HOTELS} from './hotels.const';
import {FavoritePlace} from '../types/hotel.type';

export const FAVORITE_LOCATIONS: FavoritePlace[] = [
  {
    city: 'Amsterdam',
    hotels: HOTELS.filter((hotel) => hotel.isFavorite),
  }
];
