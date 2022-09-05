import {comments, CommentsState} from './comments';
import {addNewCommentAction, fetchCommentsAction} from './api';
import {makeFakeErrorMessage, makeFakeComment} from '../../utils/mocks';
import {MAX_COMMENTS_COUNT} from '../../constants';

const mockFakeErrorMessage = makeFakeErrorMessage();
const mockFakeComments = new Array(MAX_COMMENTS_COUNT)
  .fill(null)
  .map(() => makeFakeComment());

describe('Reducer: comments', () => {
  let state: CommentsState;

  beforeEach(() => {
    state = {
      comments: [],
      loading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(comments.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCommentsAction test', () => {
    it('should set comments if fetchCommentsAction fulfilled', () => {
      expect(comments.reducer(state, { payload: mockFakeComments, type: fetchCommentsAction.fulfilled.type }))
        .toEqual({
          ...state,
          comments: mockFakeComments,
        });
    });

    it('should set error if fetchCommentsAction rejected', () => {
      expect(comments.reducer(state, { error: mockFakeErrorMessage, type: fetchCommentsAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if fetchCommentsAction pending', () => {
      expect(comments.reducer(state, { type: fetchCommentsAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });

  describe('addNewCommentAction test', () => {
    it('should set comments if addNewCommentAction fulfilled', () => {
      expect(comments.reducer(state, { payload: mockFakeComments, type: addNewCommentAction.fulfilled.type }))
        .toEqual({
          ...state,
          comments: mockFakeComments,
        });
    });

    it('should set error if addNewCommentAction rejected', () => {
      expect(comments.reducer(state, { error: mockFakeErrorMessage, type: addNewCommentAction.rejected.type }))
        .toEqual(state);
    });

    it('should update loading if addNewCommentAction pending', () => {
      expect(comments.reducer(state, { error: mockFakeErrorMessage, type: addNewCommentAction.pending.type }))
        .toEqual({
          ...state,
          loading: true,
        });
    });
  });
});
