import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {Map} from '../../components/map/map';
import {Places} from '../../components/places/places';
import {Loading} from '../../components/loading/loading';
import {getNearbyPlaces, getPlace} from '../../store/places/selectors';
import {fetchPlaceAction} from '../../store/places/api';
import {PropertyCard} from '../../components/property-card/property-card';

export function Property(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const place = useAppSelector(getPlace);
  const nearbyPlaces = useAppSelector(getNearbyPlaces);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(fetchPlaceAction(Number(id)));
    }
  }, [id]);

  if (!place || Number(id) !== place.id) {
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
            <PropertyCard place={place}/>

            <Map
              className='property'
              city={place.city}
              places={[...nearbyPlaces, place]}
              activeHotelId={place.id}
            />
          </section>
          <div className="container">
            <Places
              places={nearbyPlaces}
              sectionClassName='near-places'
              placesClassName='near-places__list'
            >
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
            </Places>
          </div>
        </main>
      </div>
    </>
  );
}
