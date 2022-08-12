import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Comment} from '../../types/comment.type';
import {RATINGS} from '../../mocks/raitings.const';
import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {Gallery} from '../../components/gallery/gallery';
import {PropertyCard} from '../../components/property-card/property-card';
import {Reviews} from '../../components/reviews/reviews';
import {ReviewForm} from '../../components/review-form/review-form';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {Map} from '../../components/map/map';
import {Places} from '../../components/places/places';
import {Hotel} from '../../types/hotel.type';

type Props = {
  comments: Comment[];
};

type RouteParams = {
  id: string;
}

export function Property({comments}: Props): JSX.Element {
  const isAuth = useAppSelector((state) => state.isAuth);
  const places = useAppSelector((state) => state.places);
  const city = useAppSelector((state) => state.city);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
  const { id } = useParams<RouteParams>();
  const nearbyHotels = places.slice().splice(1);
  let selectPlace;
  if (id) {
    selectPlace = places.find((place) => place.id === +id);
  }

  return (
    <>
      <SvgSprite />

      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <Gallery images={(selectPlace?.images) as string[]} />
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                <PropertyCard hotel={selectPlace as Hotel} />

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <Reviews comments={comments} />

                  {
                    isAuth &&
                    <ReviewForm ratings={RATINGS} />
                  }
                </section>
              </div>
            </div>
            <Map
              className='property'
              city={city}
              places={nearbyHotels}
              activeHotelId={activeHotelId}
            />
          </section>
          <div className="container">
            <Places
              places={nearbyHotels}
              sectionClassName='near-places'
              placesClassName='near-places__list'
              onPlaceCardEnter={(placeId: number) => setActiveHotelId(placeId)}
              onPlaceCardLeave={() => setActiveHotelId(null)}
            >
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
            </Places>
          </div>
        </main>
      </div>
    </>
  );
}
