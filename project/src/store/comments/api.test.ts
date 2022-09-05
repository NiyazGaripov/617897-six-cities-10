import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {Action} from 'redux';
import {makeFakeComment, makeFakePlace} from '../../utils/mocks';
import {APIRoute, MOCK_ID} from '../../constants';
import {StatusCodes} from 'http-status-codes';
import {addNewCommentAction, fetchCommentsAction, ReviewData} from './api';

const MOCK_RATING = 5;

describe('Async comments actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCommentsAction when GET /reviews/id', async () => {
    const mockPlace = [makeFakePlace(), makeFakePlace(), makeFakePlace()];
    mockAPI
      .onGet(`${APIRoute.Comments}/${MOCK_ID}`)
      .reply(StatusCodes.OK, mockPlace);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(MOCK_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should dispatch addNewCommentAction when POST /reviews/id', async () => {
    const fakeReviews = [makeFakeComment(), makeFakeComment()];
    const fakePostReviewPayload: ReviewData = {
      id: MOCK_ID,
      rating: MOCK_RATING,
      comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley...'
    };
    const {id, comment, rating} = fakePostReviewPayload;
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`, {comment, rating})
      .reply(StatusCodes.OK, fakeReviews);

    const store = mockStore();

    await store.dispatch(addNewCommentAction({ id, rating, comment }));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addNewCommentAction.pending.type,
      addNewCommentAction.fulfilled.type,
    ]);
  });
});
