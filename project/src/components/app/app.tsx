import {Route, Routes, Outlet} from 'react-router-dom';
import {AppRoute, DataLoadingStatus} from '../../constants';
import {browserHistory} from '../../browser-history';
import {useAppSelector} from '../../hooks';
import {COMMENTS} from '../../mocks/comments.const';
import {CITIES} from '../../mocks/cities.const';
import {HistoryRouter} from '../history-route/history-route';
import {Main} from '../../pages/main/main';
import {Login} from '../../pages/login/login';
import {Favorites} from '../../pages/favorites/favorites';
import {Property} from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';
import {Loading} from '../loading/loading';

export function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dataLoadingStatus = useAppSelector((state) => state.dataLoadingStatus);

  if (dataLoadingStatus === DataLoadingStatus.Pending) {
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
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
    </HistoryRouter>
  );
}
