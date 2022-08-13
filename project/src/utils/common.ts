import {Hotel} from '../types/hotel.type';
import {SortingOption} from '../types/sorting.type';
import {SortingType} from '../constants';

const MAX_PERCENTAGE = 100;
const MAX_RATING = 5;

export const transformRatingToPercentage = (rating: number): string => `${(MAX_PERCENTAGE / MAX_RATING) * rating}%`;

export const sortPlaces = (places: Hotel[], sortingType: SortingOption) => {
  switch (sortingType) {
    case SortingType.LOW_TO_HIGH:
      return places.sort((a, b) => a.price - b.price);
    case SortingType.HIGH_TO_LOW:
      return places.sort((a, b) => b.price - a.price);
    case SortingType.TOP_RATED:
      return places.sort((a, b) => b.rating - a.rating);
    default:
      return places;
  }
};
