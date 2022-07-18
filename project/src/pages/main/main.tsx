import {Hotel} from '../../types/hotel.type';
import {User} from '../../types/user.type';
import {Header} from '../../components/header/header';
import {NavigationMenu} from '../../components/navigation-menu/navigation-menu';
import {Sorting} from '../../components/sorting/sorting';
import {PlaceCard} from '../../components/place-card/place-card';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';

type Props = {
  hotels: Hotel[];
  cities: string[];
  placesCount: number;
  user: User;
};

export function Main({hotels, cities, placesCount, user}: Props): JSX.Element {
  const isEmptyPage: string = !hotels.length ? 'page__main--index-empty' : '';

  return (
    <>
      <SvgSprite />

      <div className="page page--gray page--main">
        <Header user={user}/>
        <main className={`page__main page__main--index ${isEmptyPage}`}>
          <h1 className="visually-hidden">Cities</h1>
          <NavigationMenu cities={cities}/>
          <div className="cities">
            {
              hotels.length ?
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{placesCount} places to stay in Amsterdam</b>
                    <Sorting />
                    <div className="cities__places-list places__list tabs__content">
                      {
                        hotels.map((hotel) =>
                          (
                            <PlaceCard
                              key={hotel.id}
                              className='cities'
                              isFavorite={hotel.isFavorite}
                              isPremium={hotel.isPremium}
                              previewImage={hotel.previewImage}
                              price={hotel.price}
                              title={hotel.title}
                              type={hotel.type}
                            />
                          )
                        )
                      }
                    </div>
                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map" />
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
