import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {
  addNewComment,
  loadComments,
  loadFavoritePlaces,
  loadNearbyPlaces,
  loadPlace,
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
import {Comment} from '../types/comment.type';

type AuthData = {
  email: string
  password: string
};

type ReviewData = {
  id: number,
  rating: number
  comment: string
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

export const fetchPlaceAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPlace',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Hotel>(`${APIRoute.Hotels}/${id}`);
      dispatch(loadPlace(data));
      dispatch(fetchNearbyPlacesAction(id));
      dispatch(fetchCommentsAction(id));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
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

export const fetchNearbyPlacesAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchNearbyPlaces',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Hotel[]>(`${APIRoute.Hotels}/${id}/nearby`);
    dispatch(loadNearbyPlaces(data));
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchComments',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(loadComments(data));
  },
);

export const addNewCommentAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addNewComment',
  async ({comment, rating, id}, {dispatch, extra: api}) => {
    const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(addNewComment(data));
    dispatch(fetchCommentsAction(id));
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
