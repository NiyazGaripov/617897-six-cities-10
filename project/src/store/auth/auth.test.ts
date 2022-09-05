import {auth, AuthState} from './auth';
import {AuthorizationStatus} from '../../constants';
import {checkAuthAction, loginAction, logoutAction} from './api';
import {makeFakeErrorMessage, makeFakeUser} from '../../utils/mocks';

const mockFakeUser = makeFakeUser();
const mockFakeErrorMessage = makeFakeErrorMessage();

describe('Reducer: auth', () => {
  let state: AuthState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
      loading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(auth.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set user if checkAuthAction fulfilled', () => {
      expect(auth.reducer(state, { payload: mockFakeUser, type: checkAuthAction.fulfilled.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.Auth,
          user: mockFakeUser,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(auth.reducer(state, { error: mockFakeErrorMessage, type: checkAuthAction.rejected.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth,
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set user if loginAction fulfilled', () => {
      expect(auth.reducer(state, { payload: mockFakeUser, type: loginAction.fulfilled.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.Auth,
          user: mockFakeUser,
        });
    });

    it('should update authorizationStatus to "NO_AUTH" loginAction rejected', () => {
      expect(auth.reducer(state, { error: mockFakeErrorMessage, type: loginAction.rejected.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth,
        });
    });

    it('should update loading if loginAction pending',
      () => {
        expect(auth.reducer(state, { type: loginAction.pending.type }))
          .toEqual({
            ...state,
            loading: true,
          });
      });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(auth.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          ...state,
          authorizationStatus: AuthorizationStatus.NoAuth,
        });
    });
  });
});
