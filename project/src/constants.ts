export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const LAYER_URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const MAP_ICON = {
  DEFAULT: 'img/pin.svg',
  ACTIVE: 'img/pin-active.svg',
  WIDTH: 27,
  HEIGHT: 39,
  ANCHOR: 13.5,
};

export enum SortingType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum DataLoadingStatus {
  None = 'none',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}
