import {createReducer} from '@reduxjs/toolkit';
import {setCity, setRentalPlaces, setSortingType} from './action';
import {AuthorizationStatus, SortingType} from '../constants';
import {HOTELS} from '../mocks/hotels.const';
import {User} from '../types/user.type';
import {City, Hotel} from '../types/hotel.type';
import {SortingOption} from '../types/sorting.type';

const DEFAULT_CITY = {
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 10,
  },
  name: 'Paris',
};

type InitialState = {
  isAuth: string,
  user: User,
  city: City,
  places: Hotel[],
  activeSortingType: SortingOption,
}

const initialState: InitialState = {
  isAuth: AuthorizationStatus.NoAuth,
  user: {
    email: '',
    favoritePlacesCount: 0,
  },
  city: DEFAULT_CITY,
  places: HOTELS.filter((place) => place.city.name === DEFAULT_CITY.name),
  activeSortingType: SortingType.POPULAR,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setRentalPlaces, (state, action) => {
      state.places = action.payload;
    })
    .addCase(setSortingType, (state, action) => {
      state.activeSortingType = action.payload;
    });
});
