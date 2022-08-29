import {Hotel} from '../../types/hotel.type';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {
  fetchFavoritePlacesAction,
  fetchNearbyPlacesAction,
  fetchPlaceAction,
  fetchPlacesAction,
  setFavoriteStatusAction
} from './api';
import {replaceFavoritePlaces} from '../../utils/common';

type PlacesState = {
  places: Hotel[],
  place?: Hotel,
  favoritePlaces: Hotel[],
  nearbyPlaces: Hotel[],
  loading: boolean,
  error?: string,
}

const initialState: PlacesState = {
  places: [],
  favoritePlaces: [],
  nearbyPlaces: [],
  loading: false,
};

export const places = createSlice({
  name: NameSpace.Places,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacesAction.pending, (state) => {
        state.places = [];
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPlacesAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlacesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlaceAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPlaceAction.fulfilled, (state, action) => {
        state.place = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlaceAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFavoritePlacesAction.pending, (state) => {
        state.favoritePlaces = [];
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchFavoritePlacesAction.fulfilled, (state, action) => {
        state.favoritePlaces = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavoritePlacesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNearbyPlacesAction.pending, (state) => {
        state.nearbyPlaces = [];
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchNearbyPlacesAction.fulfilled, (state, action) => {
        state.nearbyPlaces = action.payload;
        state.loading = false;
      })
      .addCase(fetchNearbyPlacesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(setFavoriteStatusAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(setFavoriteStatusAction.fulfilled, (state, action) => {
        state.places = state.places.map((place) => replaceFavoritePlaces(place, action.payload));

        if (state.place?.id === action.payload.id) {
          state.place = action.payload;
        }

        if (action.payload.isFavorite) {
          state.favoritePlaces = [...state.favoritePlaces, action.payload];
        } else {
          state.favoritePlaces = state.favoritePlaces.filter((place) => place.id !== action.payload.id);
        }

        state.nearbyPlaces = state.nearbyPlaces.map((place) => replaceFavoritePlaces(place, action.payload));
        state.loading = false;
      })
      .addCase(setFavoriteStatusAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
