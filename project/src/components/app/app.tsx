import {BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {FAVORITE_LOCATIONS} from '../../mocks/favorite-locations.const';
import {HOTELS} from '../../mocks/hotels.const';
import {COMMENTS} from '../../mocks/comments.const';
import {CITIES} from '../../mocks/cities.const';
import {Hotel} from '../../types/hotel.type';
import {User} from '../../types/user.type';
import {Main} from '../../pages/main/main';
import {Login} from '../../pages/login/login';
import {Favorites} from '../../pages/favorites/favorites';
import {Property} from '../../pages/property/property';
import {NotFound} from '../../pages/not-found/not-found';
import {PrivateRoute} from '../private-route/private-route';

type Props = {
  hotels: Hotel[];
  cities: string[];
  placesCount: number;
  user: User;
};

export function App(props: Props): JSX.Element {
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
            CITIES.map((city) => <Route path={city} key={city} element={<Outlet />}/>)
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
              nearbyHotels={props.hotels.slice().splice(2)}
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
