import {createAction} from '@reduxjs/toolkit';
import {City, Hotel} from '../types/hotel.type';

export const changeCity = createAction<City>('main/changeCity');
export const fillRentalPlaces = createAction<Hotel[]>('main/fillRentalPlaces');
