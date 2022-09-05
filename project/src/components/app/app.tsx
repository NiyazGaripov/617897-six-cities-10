import {Route, Routes, Outlet} from 'react-router-dom';
import {AppRoute, CITIES} from '../../constants';
import {useAppSelector} from '../../hooks';
import {Main} from '../../pages/main/main';
import {Login} from '../../pages/login/login';
import {Favorites} from '../../pages/favorites/favorites';
import {Property} from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';
import {Loading} from '../loading/loading';
import {getAuthorizationStatus, getLoadingStatus} from '../../store/auth/selectors';

export function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loadingStatus = useAppSelector(getLoadingStatus);

  if (loadingStatus) {
    return (
      <Loading />
    );
  }

  return (
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
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Room}
        element={<Property />}
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFound />}
      />
    </Routes>
  );
}
