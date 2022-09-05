import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {Action} from 'redux';
import {APIRoute, MOCK_ID} from '../../constants';
import {
  FavoriteStatusData,
  fetchFavoritePlacesAction,
  fetchNearbyPlacesAction,
  fetchPlaceAction,
  fetchPlacesAction,
  setFavoriteStatusAction
} from './api';
import {makeFakePlace} from '../../utils/mocks';
import {StatusCodes} from 'http-status-codes';
import {fetchCommentsAction} from '../comments/api';

const STATUS_FAVORITE_PLACE = 1;
const STATUS_NOT_FAVORITE_PLACE = 0;

describe('Async places actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchPlacesAction when GET /hotels', async () => {
    const mockPlaces = [makeFakePlace(), makeFakePlace()];
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(StatusCodes.OK, mockPlaces);

    const store = mockStore();

    await store.dispatch(fetchPlacesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPlacesAction.pending.type,
      fetchPlacesAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchPlaceAction, fetchNearbyPlacesAction, fetchCommentsAction when GET /hotels/id',
    async () => {
      const mockPlace = makeFakePlace();
      mockAPI
        .onGet(`${APIRoute.Hotels}/${MOCK_ID}`)
        .reply(StatusCodes.OK, mockPlace);

      const store = mockStore();

      await store.dispatch(fetchPlaceAction(MOCK_ID));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchPlaceAction.pending.type,
        fetchNearbyPlacesAction.pending.type,
        fetchCommentsAction.pending.type,
        fetchPlaceAction.fulfilled.type
      ]);
    });

  it('should dispatch fetchFavoritePlacesAction when GET /favorites', async () => {
    const mockPlaces = [makeFakePlace(), makeFakePlace(), makeFakePlace()];
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(StatusCodes.OK, mockPlaces);

    const store = mockStore();

    await store.dispatch(fetchFavoritePlacesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritePlacesAction.pending.type,
      fetchFavoritePlacesAction.fulfilled.type
    ]);
  });

  it('should dispatch setFavoriteStatusAction when POST /favorites/id/status', async () => {
    const fakePlace = {...makeFakePlace(), isFavorite: STATUS_FAVORITE_PLACE};
    const fakeFavoriteStatusData: FavoriteStatusData = {
      id: MOCK_ID,
      status: STATUS_NOT_FAVORITE_PLACE,
    };
    const {id, status} = fakeFavoriteStatusData;
    mockAPI
      .onPost(`${APIRoute.Favorites}/${id}/${status}`)
      .reply(StatusCodes.OK, fakePlace);

    const store = mockStore();

    await store.dispatch(setFavoriteStatusAction(fakeFavoriteStatusData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      setFavoriteStatusAction.pending.type,
      setFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearbyPlacesAction when GET /hotels/id/nearby', async () => {
    const mockPlaces = [makeFakePlace(), makeFakePlace(), makeFakePlace()];
    mockAPI
      .onGet(`${APIRoute.Hotels}/${MOCK_ID}/nearby`)
      .reply(StatusCodes.OK, mockPlaces);

    const store = mockStore();

    await store.dispatch(fetchNearbyPlacesAction(MOCK_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyPlacesAction.pending.type,
      fetchNearbyPlacesAction.fulfilled.type
    ]);
  });
});
