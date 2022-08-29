import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Hotel} from '../../types/hotel.type';
import {APIRoute, AppRoute} from '../../constants';
import {AppDispatch} from '../../types/state';
import {redirectToRoute} from '../actions';
import {fetchCommentsAction} from '../comments/api';

type FavoriteStatusData = {
  id: number;
  status: number;
};

export const fetchPlacesAction = createAsyncThunk<Hotel[], undefined, {
  extra: AxiosInstance
}>(
  'places/fetchPlaces',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Hotel[]>(APIRoute.Hotels);
    return data;
  },
);

export const fetchPlaceAction = createAsyncThunk<Hotel, number, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'places/fetchPlace',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel>(`${APIRoute.Hotels}/${id}`);
      dispatch(fetchNearbyPlacesAction(id));
      dispatch(fetchCommentsAction(id));
      return data;
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      throw error;
    }
  },
);

export const fetchFavoritePlacesAction = createAsyncThunk<Hotel[], undefined, {
  extra: AxiosInstance
}>(
  'places/fetchFavoritePlaces',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Hotel[]>(APIRoute.Favorites);
    return data;
  },
);

export const setFavoriteStatusAction = createAsyncThunk<Hotel, FavoriteStatusData, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'places/setFavoriteStatus',
  async ({id, status}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Hotel>(`${APIRoute.Favorites}/${id}/${status}`);
      return data;
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.Login));
      throw error;
    }
  },
);

export const fetchNearbyPlacesAction = createAsyncThunk<Hotel[], number, {
  extra: AxiosInstance
}>(
  'places/fetchNearbyPlaces',
  async (id, {extra: api}) => {
    const {data} = await api.get<Hotel[]>(`${APIRoute.Hotels}/${id}/nearby`);
    return data;
  },
);
