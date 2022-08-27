import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {Gallery} from '../../components/gallery/gallery';
import {PropertyCard} from '../../components/property-card/property-card';
import {Reviews} from '../../components/reviews/reviews';
import {ReviewForm} from '../../components/review-form/review-form';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {Map} from '../../components/map/map';
import {Places} from '../../components/places/places';
import {fetchPlaceAction} from '../../store/api-actions';
import {Loading} from '../../components/loading/loading';
import {AuthorizationStatus} from '../../constants';

export function Property(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const city = useAppSelector((state) => state.city);
  const comments = useAppSelector((state) => state.comments);
  const place = useAppSelector((state) => state.place);
  const nearbyPlaces = useAppSelector((state) => state.nearbyPlaces);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaceAction(Number(id)));
    }
  }, [id, dispatch]);

  if (!place) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <SvgSprite />

      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <Gallery images={place.images} />
            </div>

            <div className="property__container container">
              <div className="property__wrapper">
                <PropertyCard hotel={place} />

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <Reviews comments={comments} />

                  {
                    authorizationStatus === AuthorizationStatus.Auth && id &&
                    <ReviewForm id={Number(id)} />
                  }
                </section>
              </div>
            </div>
            <Map
              className='property'
              city={city}
              places={nearbyPlaces}
              activeHotelId={activeHotelId}
            />
          </section>
          <div className="container">
            <Places
              places={nearbyPlaces}
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
