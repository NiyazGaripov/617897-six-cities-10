import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {COMMENTS} from '../../mocks/comments.const';
import {CITIES} from '../../mocks/cities.const';
import {Main} from '../../pages/main/main';
import {Login} from '../../pages/login/login';
import {Favorites} from '../../pages/favorites/favorites';
import {Property} from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        >
          {
            CITIES.map((city) => <Route path={city.name} key={city.name} element={<Outlet />}/>)
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
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={
            <Property
              comments={COMMENTS}
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
