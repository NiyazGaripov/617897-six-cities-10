import {createAction} from '@reduxjs/toolkit';
import {City, Hotel} from '../types/hotel.type';
import {AppRoute, AuthorizationStatus, DataLoadingStatus, SortingType} from '../constants';

export const setCity = createAction<City>('main/setCity');
export const setRentalPlaces = createAction<Hotel[]>('main/setRentalPlaces');
export const setSortingType = createAction<SortingType>('main/setSortingType');
export const requireAuthorization = createAction<AuthorizationStatus>('data/requireAuthorization');
export const loadPlaces = createAction<Hotel[]>('data/loadPlaces');
export const loadFavoritePlaces = createAction<Hotel[]>('data/loadFavoritePlaces');
export const setDataLoadingStatus = createAction<DataLoadingStatus>('data/setDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
