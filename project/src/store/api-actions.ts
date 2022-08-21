import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {
  loadFavoritePlaces,
  loadPlaces,
  redirectToRoute,
  requireAuthorization,
  setDataLoadingStatus,
  setUserData
} from './actions';
import {AppDispatch, State} from '../types/state';
import {Hotel} from '../types/hotel.type';
import {User} from '../types/user.type';
import {APIRoute, AppRoute, AuthorizationStatus, DataLoadingStatus} from '../constants';
import {dropToken, saveToken} from '../services/token';

type AuthData = {
  email: string
  password: string
};

export const fetchPlacesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPlaces',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadingStatus(DataLoadingStatus.Pending));
      const {data} = await api.get<Hotel[]>(APIRoute.Hotels);
      dispatch(loadPlaces(data));
      dispatch(setDataLoadingStatus(DataLoadingStatus.Fulfilled));
    } catch {
      dispatch(setDataLoadingStatus(DataLoadingStatus.Rejected));
    }
  },
);

export const fetchFavoritePlacesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavoritePlaces',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setDataLoadingStatus(DataLoadingStatus.Pending));
      const {data} = await api.get<Hotel[]>(APIRoute.Favorites);
      dispatch(loadFavoritePlaces(data));
      dispatch(setDataLoadingStatus(DataLoadingStatus.Fulfilled));
    } catch {
      dispatch(setDataLoadingStatus(DataLoadingStatus.Rejected));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(user));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
