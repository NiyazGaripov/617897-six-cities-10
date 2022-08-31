import {Gallery} from '../gallery/gallery';
import {PropertyInfo} from '../property-info/property-info';
import {Reviews} from '../reviews/reviews';
import {AuthorizationStatus} from '../../constants';
import {ReviewForm} from '../review-form/review-form';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/auth/selectors';
import {getSortedComments} from '../../store/comments/selectors';
import {Hotel} from '../../types/hotel.type';

type Props = {
  place: Hotel;
}

export function PropertyCard({place}: Props): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const comments = useAppSelector(getSortedComments);

  return (
    <>
      <div className="property__gallery-container container">
        <Gallery images={place.images} />
      </div>

      <div className="property__container container">
        <div className="property__wrapper">
          <PropertyInfo hotel={place} />

          <section className="property__reviews reviews">
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
            <Reviews comments={comments} />

            {
              authorizationStatus === AuthorizationStatus.Auth &&
              <ReviewForm id={Number(place.id)} />
            }
          </section>
        </div>
      </div>
    </>
  );
}
