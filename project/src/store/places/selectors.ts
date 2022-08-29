import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {Hotel} from '../../types/hotel.type';
import {NameSpace} from '../../constants';
import {getActiveSortingType, getSelectCity} from '../app/selectors';
import {filterPlaces, sortPlaces} from '../../utils/common';

type FavoritePlacesByCity = {
  [key: string]: Hotel[];
};

export const getPlaces = (state: State): Hotel[] => state[NameSpace.Places].places;
export const getPlace = (state: State): Hotel | undefined => state[NameSpace.Places].place;
export const getFavoritePlaces = (state: State): Hotel[] => state[NameSpace.Places].favoritePlaces;
export const getNearbyPlaces = (state: State): Hotel[] => state[NameSpace.Places].nearbyPlaces;

export const getFilteredPlacesByCity = createSelector(
  getSelectCity,
  getPlaces,
  (city, places) => filterPlaces(places, city));

export const getSortedPlaces = createSelector(
  getFilteredPlacesByCity,
  getActiveSortingType,
  (places, sortingType) => sortPlaces(places, sortingType));

export const getFavoritePlacesByCity = createSelector(
  getFavoritePlaces,
  (favoritePlaces) => favoritePlaces.reduce<FavoritePlacesByCity>((acc, place) => {
    const city = place.city;

    if (!acc[city.name]) {
      acc[city.name] = [];
    }

    acc[city.name].push(place);

    return acc;
  }, {})
);
