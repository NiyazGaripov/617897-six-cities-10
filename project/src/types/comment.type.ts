import Host from './host.type';

type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  author: Host;
};

export default Comment;
