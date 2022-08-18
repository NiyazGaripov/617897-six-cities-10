import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {NavigationMenu} from '../../components/navigation-menu/navigation-menu';
import {Sorting} from '../../components/sorting/sorting';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {Map} from '../../components/map/map';
import {Places} from '../../components/places/places';
import {filterPlaces, sortPlaces} from '../../utils/common';

export function Main(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const places = useAppSelector((state) => state.places);
  const activeSortingType = useAppSelector((state) => state.activeSortingType);
  const filteredPlaces = filterPlaces(places, city);
  const sortedPlaces = sortPlaces(filteredPlaces, activeSortingType);
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
  const isEmptyPage: string = !places.length ? 'page__main--index-empty' : '';

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
              sortedPlaces.length ?
                <div className="cities__places-container container">
                  <Places
                    places={sortedPlaces}
                    onPlaceCardEnter={(id: number) => setActiveHotelId(id)}
                    onPlaceCardLeave={() => setActiveHotelId(null)}
                  >
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{sortedPlaces.length} places to stay in {city.name}</b>
                    <Sorting
                      activeSortingType={activeSortingType}
                      city={city}
                    />
                  </Places>

                  <div className="cities__right-section">
                    <Map
                      className='cities'
                      city={city}
                      places={sortedPlaces}
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
