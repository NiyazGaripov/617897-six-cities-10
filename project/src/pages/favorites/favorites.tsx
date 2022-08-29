import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {getFavoritePlaces} from '../../store/places/selectors';
import {FavoriteLocationList} from '../../components/favorite-location-list/favorite-location-list';
import {FavoriteEmpty} from '../../components/favorite-empty/favorite-empty';

export function Favorites(): JSX.Element {
  const favoritePlaces = useAppSelector(getFavoritePlaces);

  return (
    <>
      <SvgSprite />

      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            {
              favoritePlaces.length ?
                <FavoriteLocationList /> :
                <FavoriteEmpty />
            }
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
