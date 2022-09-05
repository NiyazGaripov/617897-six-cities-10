import {places, PlacesState} from './places';
import {
  fetchFavoritePlacesAction,
  fetchNearbyPlacesAction,
  fetchPlaceAction,
  fetchPlacesAction,
  setFavoriteStatusAction
} from './api';
import {makeFakeErrorMessage, makeFakePlace} from '../../utils/mocks';
import {replaceFavoritePlaces} from '../../utils/common';

const MAX_PLACES_COUNT = 5;
const mockFakeErrorMessage = makeFakeErrorMessage();
const mockFakePlace = makeFakePlace();
const mockFakePlaces = new Array(MAX_PLACES_COUNT)
  .fill(null)
  .map(() => makeFakePlace());
const mockFavoritePlace = {...makeFakePlace(), isFavorite: true};
const mockNotFavoritePlace = {...makeFakePlace(), isFavorite: false};

describe('Reducer: places', () => {
  let state: PlacesState;

  beforeEach(() => {
    state = {
      places: [],
      favoritePlaces: [],
      nearbyPlaces: [],
      loading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(places.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchPlacesAction test', () => {
    it('should set places if fetchPlacesAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockFakePlaces, type: fetchPlacesAction.fulfilled.type }))
        .toEqual({
          ...state,
          places: mockFakePlaces,
        });
    });

    it('should set error if fetchPlacesAction rejected', () => {
      expect(places.reducer(state, { error: mockFakeErrorMessage, type: fetchPlacesAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if fetchPlacesAction pending', () => {
      expect(places.reducer(state, { type: fetchPlacesAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });

  describe('fetchPlaceAction test', () => {
    it('should set place if fetchPlaceAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockFakePlace, type: fetchPlaceAction.fulfilled.type }))
        .toEqual({
          ...state,
          place: mockFakePlace,
        });
    });

    it('should set error if fetchPlaceAction rejected', () => {
      expect(places.reducer(state, { error: mockFakeErrorMessage, type: fetchPlaceAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if fetchPlaceAction pending', () => {
      expect(places.reducer(state, { type: fetchPlaceAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });

  describe('fetchFavoritePlacesAction test', () => {
    it('should set favoritePlaces if fetchFavoritePlacesAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockFakePlaces, type: fetchFavoritePlacesAction.fulfilled.type }))
        .toEqual({
          ...state,
          favoritePlaces: mockFakePlaces,
        });
    });

    it('should set error if fetchFavoritePlacesAction rejected', () => {
      expect(places.reducer(state, { error: mockFakeErrorMessage, type: fetchFavoritePlacesAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if fetchFavoritePlacesAction pending', () => {
      expect(places.reducer(state, { type: fetchFavoritePlacesAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });

  describe('fetchNearbyPlacesAction test', () => {
    it('should set favoritePlaces if fetchNearbyPlacesAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockFakePlaces, type: fetchNearbyPlacesAction.fulfilled.type }))
        .toEqual({
          ...state,
          nearbyPlaces: mockFakePlaces,
        });
    });

    it('should set error if fetchNearbyPlacesAction rejected', () => {
      expect(places.reducer(state, { error: mockFakeErrorMessage, type: fetchNearbyPlacesAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if fetchNearbyPlacesAction pending', () => {
      expect(places.reducer(state, { type: fetchNearbyPlacesAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });

  describe('setFavoriteStatusAction test', () => {
    it('should set favorite status if setFavoriteStatusAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockFavoritePlace, type: setFavoriteStatusAction.fulfilled.type }))
        .toEqual({
          ...state,
          favoritePlaces: [...state.favoritePlaces, mockFavoritePlace],
        });
    });

    it('should remove favorite status if setFavoriteStatusAction fulfilled', () => {
      expect(places.reducer(state, { payload: mockNotFavoritePlace, type: setFavoriteStatusAction.fulfilled.type }))
        .toEqual({
          ...state,
          favoritePlaces: state.favoritePlaces
            .filter((place) => place.id !== mockNotFavoritePlace.id)
        });
    });

    it('should set places, place and nearbyPlaces if setFavoriteStatusAction fulfilled', () => {
      const initState: PlacesState = {
        ...state,
        places: mockFakePlaces,
        place: makeFakePlace(),
        favoritePlaces: [mockFavoritePlace],
        nearbyPlaces: mockFakePlaces,
      };

      const changePlaces = initState.places
        .map((place) => replaceFavoritePlaces(place, mockFakePlace));

      let changePlace;
      if (initState.place) {
        changePlace = replaceFavoritePlaces(initState.place, mockFakePlace);
      }

      const changeNearbyPlaces = initState.nearbyPlaces
        .map((place) => replaceFavoritePlaces(place, mockFakePlace));

      expect(places.reducer(initState, {payload: mockFakePlace, type: setFavoriteStatusAction.fulfilled.type}))
        .toEqual({
          ...state,
          places: changePlaces,
          place: changePlace,
          favoritePlaces: [mockFavoritePlace],
          nearbyPlaces: changeNearbyPlaces,
        });
    });
  });
});
