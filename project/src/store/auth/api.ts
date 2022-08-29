import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch} from '../../types/state';
import {APIRoute, AppRoute} from '../../constants';
import {User} from '../../types/user.type';
import {dropToken, saveToken} from '../../services/token';
import {redirectToRoute} from '../actions';
import {fetchFavoritePlacesAction, fetchPlacesAction} from '../places/api';

type AuthData = {
  email: string
  password: string
};

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'auth/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    if (data) {
      dispatch(fetchFavoritePlacesAction());
    }
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'auth/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchFavoritePlacesAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'auth/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchPlacesAction());
  },
);
