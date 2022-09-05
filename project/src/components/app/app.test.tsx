import {Provider} from 'react-redux';
import {generatePath} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus, DEFAULT_CITY, MOCK_ID, NameSpace, SortingType} from '../../constants';
import {makeFakeComment, makeFakePlace, makeFakeUser} from '../../utils/mocks';
import {HistoryRouter} from '../history-route/history-route';
import {App} from './app';

const mockStore = configureMockStore();
const mockPlace = {...makeFakePlace(), id: MOCK_ID, city: DEFAULT_CITY};
const mockComment = makeFakeComment();
const mockUser = makeFakeUser();

const storeWithAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: mockUser,
    loading: false,
  },
  [NameSpace.App]: {
    city: DEFAULT_CITY,
    activeSortingType: SortingType.Popular,
  },
  [NameSpace.Places]: {
    places: [mockPlace],
    place: mockPlace,
    favoritePlaces: [mockPlace],
    nearbyPlaces: [mockPlace],
    loading: false,
  },
  [NameSpace.Comments]: {
    comments: [mockComment],
    loading: false,
  },
});

const storeWithoutAuth = mockStore({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
    loading: false,
  },
  [NameSpace.App]: {
    city: DEFAULT_CITY,
    activeSortingType: SortingType.Popular,
  },
  [NameSpace.Places]: {
    places: [mockPlace],
    place: mockPlace,
    favoritePlaces: [],
    nearbyPlaces: [mockPlace],
    loading: false,
  },
  [NameSpace.Comments]: {
    comments: [mockComment],
    loading: false,
  },
});

storeWithAuth.dispatch = jest.fn();
storeWithoutAuth.dispatch = jest.fn();

const history = createMemoryHistory();

const fakeWithAuthApp = (
  <Provider store={storeWithAuth}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeWithoutAuthApp = (
  <Provider store={storeWithoutAuth}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Main when user is navigated to /', () => {
    history.push(AppRoute.Main);

    render(fakeWithAuthApp);

    expect(screen.getByText(/places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render Login when user is navigated to /login', () => {
    history.push(AppRoute.Login);

    render(fakeWithAuthApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render empty favorites if favorites is empty when user is navigated to /favorites', () => {
    storeWithAuth.getState()[NameSpace.Places].favoritePlaces = [];
    history.push(AppRoute.Favorites);

    render(fakeWithAuthApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });

  it('should render Favorites if favorites is not empty when user is navigated to /favorites', () => {
    history.push(AppRoute.Favorites);

    render(fakeWithAuthApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should redirect to /login if user not authorization and user wants to be navigated to /favorites', () => {
    history.push(AppRoute.Favorites);

    render(fakeWithoutAuthApp);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render Room if user sign in and when user is navigated to /room/id', () => {
    history.push(generatePath(AppRoute.Room, { id: `${mockPlace.id}`}));

    render(fakeWithAuthApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render Room without comment form if user not sign in and when user is navigated to /room/id', () => {
    history.push(generatePath(AppRoute.Room, { id: `${mockPlace.id}`}));

    render(fakeWithoutAuthApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render NotFound when user is navigated to non-existent route', () => {
    history.push('/not-found-route');

    render(fakeWithAuthApp);

    expect(screen.getByText(/Error 404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to home page/i)).toBeInTheDocument();
  });
});
