import dayjs, {ConfigType} from 'dayjs';
import {City, Hotel} from '../types/hotel.type';
import {CITIES, MAX_RATING, SortingType} from '../constants';
import {Comment} from '../types/comment.type';

const MAX_PERCENTAGE = 100;

export const transformRatingToPercentage = (rating: number): string => `${(MAX_PERCENTAGE / MAX_RATING) * Math.round(rating)}%`;

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

export const getFormatDate = (date: ConfigType, format: string) => dayjs(date).format(format);

export const sortCommentsByDate = (commentA: Comment, commentB: Comment) => dayjs(commentB.date).diff(dayjs(commentA.date));
