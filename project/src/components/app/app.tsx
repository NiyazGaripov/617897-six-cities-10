import {BrowserRouter, Route, Routes } from 'react-router-dom';
import AppProps from './app.type';
import {AppRoute} from '../../constants';
import FAVORITE_LOCATIONS from '../../mock-data/favorite-locations.const';
import HOTELS from '../../mock-data/hotels.const';
import COMMENTS from '../../mock-data/comments.const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              hotels={props.hotels}
              cities={props.cities}
              placesCount={props.placesCount}
              user={props.user}
            />
          }
        >
          <Route
            path=":city"
            element
          />
        </Route>
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <Favorites
              user={props.user}
              locations={FAVORITE_LOCATIONS}
            />
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <Property
              isAuth
              user={props.user}
              hotel={HOTELS[0]}
              comments={COMMENTS}
              nearbyHotels={props.hotels}
            />
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
