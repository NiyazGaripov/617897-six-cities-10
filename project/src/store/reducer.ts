import {createReducer} from '@reduxjs/toolkit';
import {HOTELS} from '../mocks/hotels.const';
import {setCity, setRentalPlaces} from './action';
import {AuthorizationStatus} from '../constants';

const DEFAULT_CITY = {
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 10,
  },
  name: 'Paris',
};

const initialState = {
  isAuth: AuthorizationStatus.NoAuth,
  user: {
    email: '',
    favoritePlacesCount: 0,
  },
  city: DEFAULT_CITY,
  places: HOTELS.filter((place) => place.city.name === DEFAULT_CITY.name),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setRentalPlaces, (state, action) => {
      state.places = action.payload;
    });
});
