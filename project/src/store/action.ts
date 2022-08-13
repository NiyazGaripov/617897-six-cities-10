import {createAction} from '@reduxjs/toolkit';
import {City, Hotel} from '../types/hotel.type';
import {SortingOption} from '../types/sorting.type';

export const setCity = createAction<City>('main/setCity');
export const setRentalPlaces = createAction<Hotel[]>('main/setRentalPlaces');
export const setSortingType = createAction<SortingOption>('main/setSortingType');
