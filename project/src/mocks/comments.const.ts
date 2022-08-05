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
  {
    comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eveniet ipsam nisi, non optio recusandae tempore! Autem consectetur, cumque eligendi expedita harum provident similique suscipit. Asperiores cum explicabo quidem tempore.',
    date: new Date().toISOString(),
    id: 2,
    rating: 4.5,
    author: {
      avatarUrl: 'img/avatar.svg',
      id: 10,
      isPro: false,
      name: 'Keks',
    },
  },
];
