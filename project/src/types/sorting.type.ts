import {SortingType} from '../constants';

export type SortingOption = typeof SortingType[keyof typeof SortingType];
