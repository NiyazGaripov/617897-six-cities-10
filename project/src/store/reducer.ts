import {createReducer} from '@reduxjs/toolkit';
import {
  loadComments,
  loadFavoritePlaces,
  loadNearbyPlaces,
  loadPlace,
  loadPlaces,
  requireAuthorization,
  setCity,
  setDataLoadingStatus,
  setRentalPlaces,
  setSortingType,
  setUserData
} from './actions';
import {AuthorizationStatus, DataLoadingStatus, SortingType} from '../constants';
import {User} from '../types/user.type';
import {City, Hotel} from '../types/hotel.type';
import {Comment} from '../types/comment.type';

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
  user?: User,
  city: City,
  places: Hotel[],
  place?: Hotel,
  favoritePlaces: Hotel[],
  nearbyPlaces: Hotel[],
  comments: Comment[],
  activeSortingType: SortingType,
  dataLoadingStatus: DataLoadingStatus,
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  city: DEFAULT_CITY,
  places: [],
  favoritePlaces: [],
  nearbyPlaces: [],
  comments: [],
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
    .addCase(loadPlace, (state, action) => {
      state.place = action.payload;
    })
    .addCase(loadFavoritePlaces, (state, action) => {
      state.favoritePlaces = action.payload;
    })
    .addCase(loadNearbyPlaces, (state, action) => {
      state.nearbyPlaces = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
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
