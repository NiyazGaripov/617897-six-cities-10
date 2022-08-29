import {useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {NavigationMenu} from '../../components/navigation-menu/navigation-menu';
import {SvgSprite} from '../../components/svg-sprite/svg-sprite';
import {getSelectCity} from '../../store/app/selectors';
import {getPlaces} from '../../store/places/selectors';
import {PlacesWithMap} from '../../components/places-with-map/places-with-map';
import {PlacesEmpty} from '../../components/places-empty/places-empty';

export function Main(): JSX.Element {
  const city = useAppSelector(getSelectCity);
  const places = useAppSelector(getPlaces);
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
              places.length ?
                <PlacesWithMap /> :
                <PlacesEmpty />
            }
          </div>
        </main>
      </div>
    </>
  );
}
