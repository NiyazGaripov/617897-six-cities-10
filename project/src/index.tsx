import React from 'react';
import ReactDOM from 'react-dom/client';
import {HOTELS} from './mocks/hotels.const';
import {CITIES} from './mocks/cities.const';
import {App} from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      hotels={HOTELS}
      cities={CITIES}
      placesCount={312}
      user={{email: 'Oliver.conner@gmail.com', favoritePlacesCount: 5}}
    />
  </React.StrictMode>,
);
