import {State} from '../../types/state';
import {City} from '../../types/hotel.type';
import {NameSpace, SortingType} from '../../constants';

export const getSelectCity = (state: State): City => state[NameSpace.App].city;
export const getActiveSortingType = (state: State): SortingType => state[NameSpace.App].activeSortingType;
