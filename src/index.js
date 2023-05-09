import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store, { persister } from './redux/indexStore';
import { App } from 'App';
import './index.css';
import './styles/modern-normalize.css';
import './styles/project-normalize.css';
import { PersistGate } from 'redux-persist/integration/react';
import Notiflix from 'notiflix';
import { Provider } from 'react-redux';
import { PreLoader } from 'Layout/Preloader/PreLoader';

Notiflix.Notify.init({
  position: 'center-top',
  opacity: 0.9,
  timeout: 3000,
  clickToClose: true,
  fontSize: '18px',
  width: '350px',
});
// Варіанти повідомлень Notiflix:
// Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Please choose a date in the future');
// Notiflix.Notify.failure(`Oops, there is no country with that name`);
// Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

// Дістати зі стору будь-яке значення - хук useSelector
// Для виконання якоїсь дії стору - хук useDispatch

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PreLoader />} persistor={persister}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
