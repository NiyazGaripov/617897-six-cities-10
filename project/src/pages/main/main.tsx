import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fillRentalPlaces} from '../../store/action';
import {HOTELS} from '../../mocks/hotels.const';
import {Header} from '../../components/header/header';
import {NavigationMenu} from '../../components/navigation-menu/navigation-menu';
import {Sorting} from '../../components/sorting/sorting';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {Map} from '../../components/map/map';
import {Places} from '../../components/places/places';

export function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const {places, city} = useAppSelector((state) => state);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
  const isEmptyPage: string = !places.length ? 'page__main--index-empty' : '';
  const filteredPlaces = HOTELS.filter((place) => place.city.name === city.name);

  useEffect(() => {
    dispatch(fillRentalPlaces(filteredPlaces));
  }, [city]);

  return (
    <>
      <SvgSprite />

      <div className="page page--gray page--main">
        <Header />
        <main className={`page__main page__main--index ${isEmptyPage}`}>
          <h1 className="visually-hidden">Cities</h1>
          <NavigationMenu activeCity={city} />
          <div className="cities">
            {
              filteredPlaces.length ?
                <div className="cities__places-container container">
                  <Places
                    places={filteredPlaces}
                    onPlaceCardEnter={(id: number) => setActiveHotelId(id)}
                    onPlaceCardLeave={() => setActiveHotelId(null)}
                  >
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{filteredPlaces.length} places to stay in {city.name}</b>
                    <Sorting />
                  </Places>

                  <div className="cities__right-section">
                    <Map
                      className='cities'
                      city={city}
                      places={filteredPlaces}
                      activeHotelId={activeHotelId}
                    />
                  </div>
                </div> :
                <div className="cities__places-container cities__places-container--empty container">
                  <section className="cities__no-places">
                    <div className="cities__status-wrapper tabs__content">
                      <b className="cities__status">No places to stay available</b>
                      <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                    </div>
                  </section>
                  <div className="cities__right-section" />
                </div>
            }
          </div>
        </main>
      </div>
    </>
  );
}
