import {User} from '../../types/user.type';
import {Hotel} from '../../types/hotel.type';
import {Comment} from '../../types/comment.type';
import {RATINGS} from '../../mock-data/raitings.const';
import {Header} from '../../components/header/header';
import {Gallery} from '../../components/gallery/gallery';
import {PlaceCard} from '../../components/place-card/place-card';
import {PropertyCard} from '../../components/property-card/property-card';
import {Reviews} from '../../components/reviews/reviews';
import {ReviewForm} from '../../components/review-form/review-form';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';

type Props = {
  isAuth: boolean;
  user: User;
  hotel: Hotel;
  comments: Comment[];
  nearbyHotels: Hotel[];
};

export function Property({isAuth, user, hotel, comments, nearbyHotels}: Props): JSX.Element {
  return (
    <>
      <SvgSprite />

      <div className="page">
        {
          isAuth ?
            <Header user={user} /> :
            <Header user={{email: '', favoritePlacesCount: 0}} />
        }

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <Gallery images={hotel.images} />
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                <PropertyCard hotel={hotel} />

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  <Reviews comments={comments} />

                  {
                    isAuth &&
                    <ReviewForm ratings={RATINGS} />
                  }
                </section>
              </div>
            </div>
            <section className="property__map map" />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {
                  nearbyHotels.map((nearbyHotel) =>
                    (
                      <PlaceCard
                        key={nearbyHotel.id}
                        template='cities'
                        isFavorite={nearbyHotel.isFavorite}
                        isPremium={nearbyHotel.isPremium}
                        previewImage={nearbyHotel.previewImage}
                        price={nearbyHotel.price}
                        title={nearbyHotel.title}
                        type={nearbyHotel.type}
                      />
                    )
                  )
                }
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
