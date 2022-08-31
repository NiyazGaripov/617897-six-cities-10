import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {Comment} from '../../types/comment.type';
import {MAX_COMMENTS_COUNT, NameSpace} from '../../constants';
import {sortCommentsByDate} from '../../utils/common';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Comments].loading;
export const getError = (state: State): boolean => !!state[NameSpace.Comments].error;

export const getSortedComments = createSelector(
  getComments,
  (comments) => {
    if (comments.length > MAX_COMMENTS_COUNT) {
      return [...comments].sort(sortCommentsByDate).slice(0, MAX_COMMENTS_COUNT);
    }
    return [...comments].sort(sortCommentsByDate);
  }
);
