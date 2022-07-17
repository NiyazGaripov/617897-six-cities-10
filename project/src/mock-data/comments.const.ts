import {Comment} from '../types/comment.type';

export const COMMENTS: Comment[] = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: new Date().toISOString(),
    id: 1,
    rating: 4.7,
    author: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 15,
      isPro: true,
      name: 'Max',
    },
  },
];
