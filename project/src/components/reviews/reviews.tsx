import {Comment} from '../../types/comment.type';
import {Review} from '../review/review';

type Props = {
  comments: Comment[];
};

export function Reviews(props: Props): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        props.comments.map((comment) =>
          (
            <Review key={comment.id} comment={comment} />
          )
        )
      }
    </ul>
  );
}
