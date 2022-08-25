import {Host} from './hotel.type';

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Host;
};
