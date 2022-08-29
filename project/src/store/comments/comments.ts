import {Comment} from '../../types/comment.type';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../constants';
import {addNewCommentAction, fetchCommentsAction} from './api';

type CommentsState = {
  comments: Comment[],
  loading: boolean,
  error?: string,
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
};

export const comments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.comments = [];
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewCommentAction.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addNewCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(addNewCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
