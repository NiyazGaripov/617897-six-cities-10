import {City, Hotel} from '../types/hotel.type';
import {CITIES, SortingType} from '../constants';

const MAX_PERCENTAGE = 100;
const MAX_RATING = 5;

export const transformRatingToPercentage = (rating: number): string => `${(MAX_PERCENTAGE / MAX_RATING) * rating}%`;

export const filterPlaces = (places: Hotel[], city: City) => places.filter((place) => place.city.name === city.name);

export const sortPlaces = ([...places]: Hotel[], sortingType: string) => {
  switch (sortingType) {
    case SortingType.LowToHigh:
      return places.sort((a, b) => a.price - b.price);
    case SortingType.HighToLow:
      return places.sort((a, b) => b.price - a.price);
    case SortingType.TopRated:
      return places.sort((a, b) => b.rating - a.rating);
    default:
      return places;
  }
};

export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomCity = (): City => CITIES[getRandomInteger(0, CITIES.length - 1)];

export const replaceFavoritePlaces = (oldPlace: Hotel, newPlace: Hotel): Hotel => {
  if (oldPlace.id === newPlace.id) {
    return newPlace;
  }
  return oldPlace;
};

