import {createSlice} from '@reduxjs/toolkit';
import {City} from '../../types/hotel.type';
import {DEFAULT_CITY, NameSpace, SortingType} from '../../constants';

type AppState = {
  city: City,
  activeSortingType: SortingType,
}

const initialState: AppState = {
  city: DEFAULT_CITY,
  activeSortingType: SortingType.Popular,
};

export const app = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
      state.activeSortingType = SortingType.Popular;
    },
    setSortingType: (state, action) => {
      state.activeSortingType = action.payload;
    },
  },
});

export const {setCity, setSortingType} = app.actions;
