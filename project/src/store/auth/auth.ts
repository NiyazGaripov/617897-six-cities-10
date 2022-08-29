import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types/user.type';
import {AuthorizationStatus, NameSpace} from '../../constants';
import {checkAuthAction, loginAction, logoutAction} from './api';

type AuthState = {
  authorizationStatus: AuthorizationStatus,
  loading: boolean,
  user: User | null,
  error?: string,
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  loading: false,
};

export const auth = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loading = false;
      })
      .addCase(checkAuthAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loading = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loading = false;
      });
  }
});
