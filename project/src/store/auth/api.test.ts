import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {APIRoute} from '../../constants';
import {AuthData, checkAuthAction, loginAction, logoutAction} from './api';
import {fetchFavoritePlacesAction, fetchPlacesAction} from '../places/api';
import {redirectToRoute} from '../actions';
import {StatusCodes} from 'http-status-codes';

describe('Async auth actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should update authorization status to «auth» and dispatch fetchFavoritePlacesAction when server returns 200',
    async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(StatusCodes.OK, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritePlacesAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

  it('should dispatch loginAction, redirectToRoute and fetchFavoritePlacesAction when POST /login',
    async () => {
      const fakeUser: AuthData = {email: 'test@test.com', password: '012345'};

      mockAPI
        .onPost(APIRoute.Login)
        .reply(StatusCodes.OK, {token: 'secret'});


      const store = mockStore();
      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        fetchFavoritePlacesAction.pending.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
    });

  it('should dispatch logoutAction when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      fetchPlacesAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
