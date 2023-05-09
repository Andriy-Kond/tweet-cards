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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PreLoader />} persistor={persister}>
        <BrowserRouter basename="tweet-cards">
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
