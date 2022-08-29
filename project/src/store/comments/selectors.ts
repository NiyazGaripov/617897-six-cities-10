import {State} from '../../types/state';
import {Comment} from '../../types/comment.type';
import {NameSpace} from '../../constants';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].comments;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Comments].loading;
export const getError = (state: State): boolean => !!state[NameSpace.Comments].error;
