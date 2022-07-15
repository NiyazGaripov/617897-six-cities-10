import {BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import AppProps from './app.type';
import {AppRoute, AuthorizationStatus} from '../../constants';
import FAVORITE_LOCATIONS from '../../mock-data/favorite-locations.const';
import HOTELS from '../../mock-data/hotels.const';
import COMMENTS from '../../mock-data/comments.const';
import CITIES from '../../mock-data/cities.const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Property from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';

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
          {
            CITIES.map((city: string) => <Route path={city} key={city} element={<Outlet />}/>)
          }
        </Route>
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites
                user={props.user}
                locations={FAVORITE_LOCATIONS}
              />
            </PrivateRoute>
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
