import FavoriteLocation from '../../components/favorite-location/favorite-location';
import FavoritesProps from './favorites.type';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SvgSprite from '../../components/svg-sprite/svg-sprite';

function Favorites({user, locations}: FavoritesProps): JSX.Element {
  const favoriteLocations = locations.map((location): JSX.Element =>
    (
      <FavoriteLocation
        key={location.city}
        city={location.city}
        hotels={location.hotels}
      />
    )
  );

  return (
    <>
      <SvgSprite />

      <div className="page">
        <Header user={user} />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {
              locations.length ?
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {favoriteLocations}
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

export default Favorites;
