import {createReducer} from '@reduxjs/toolkit';
import {
  loadFavoritePlaces,
  loadPlaces,
  requireAuthorization,
  setCity, setDataLoadingStatus,
  setRentalPlaces,
  setSortingType, setUserData
} from './actions';
import {AuthorizationStatus, DataLoadingStatus, SortingType} from '../constants';
import {User} from '../types/user.type';
import {City, Hotel} from '../types/hotel.type';

const DEFAULT_CITY = {
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 10,
  },
  name: 'Paris',
};

type InitialState = {
  authorizationStatus: AuthorizationStatus,
  user: User | undefined,
  city: City,
  places: Hotel[],
  favoritePlaces: Hotel[],
  activeSortingType: SortingType,
  dataLoadingStatus: DataLoadingStatus,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: undefined,
  city: DEFAULT_CITY,
  places: [],
  favoritePlaces: [],
  activeSortingType: SortingType.Popular,
  dataLoadingStatus: DataLoadingStatus.None,
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
    })
    .addCase(loadPlaces, (state, action) => {
      state.places = action.payload;
    })
    .addCase(loadFavoritePlaces, (state, action) => {
      state.places = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.dataLoadingStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    });
});
