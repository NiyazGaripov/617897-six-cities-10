import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../constants';
import {auth} from './auth/auth';
import {app} from './app/app';
import {places} from './places/places';
import {comments} from './comments/comments';

export const rootReducer = combineReducers({
  [NameSpace.Auth]: auth.reducer,
  [NameSpace.App]: app.reducer,
  [NameSpace.Places]: places.reducer,
  [NameSpace.Comments]: comments.reducer,
});
