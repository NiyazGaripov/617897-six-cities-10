import {useEffect} from 'react';
import {fetchFavoritePlacesAction} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FavoriteLocation} from '../../components/favorite-location/favorite-location';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';

export function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritePlaces = useAppSelector((state) => state.favoritePlaces);

  useEffect(() => {
    dispatch(fetchFavoritePlacesAction());
  }, [dispatch]);

  return (
    <>
      <SvgSprite />

      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {
              favoritePlaces.length ?
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {
                      favoritePlaces.map((favoritePlace) =>
                        (
                          <FavoriteLocation
                            key={favoritePlace.id}
                            city={favoritePlace.city}
                            hotels={favoritePlaces.filter((place) => place.city.name === favoritePlace.city.name)}
                          />
                        )
                      )
                    }
                  </ul>
                </section> :
                <section className="favorites favorites--empty">
                  <h1 className="visually-hidden">Favorites (empty)</h1>
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                  </div>
                </section>
            }
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
