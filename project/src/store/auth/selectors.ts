import {State} from '../../types/state';
import {AuthorizationStatus, NameSpace} from '../../constants';
import {User} from '../../types/user.type';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.Auth].authorizationStatus;
export const getUser = (state: State): User | undefined => state[NameSpace.Auth].user;
export const getLoadingStatus = (state: State): boolean => state[NameSpace.Auth].loading;
