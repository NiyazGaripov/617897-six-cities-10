import {createAction} from '@reduxjs/toolkit';
import {City, Hotel} from '../types/hotel.type';

export const setCity = createAction<City>('main/setCity');
export const setRentalPlaces = createAction<Hotel[]>('main/setRentalPlaces');
