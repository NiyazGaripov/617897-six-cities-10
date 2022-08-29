import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {App} from './components/app/app';
import 'react-toastify/dist/ReactToastify.css';
import {fetchPlacesAction} from './store/places/api';
import {checkAuthAction} from './store/auth/api';

store.dispatch(fetchPlacesAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
