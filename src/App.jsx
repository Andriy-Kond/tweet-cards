import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SharedLayout } from 'Layout/SharedLayout';
import HomePage from 'pages/Home/HomePage';

const TweetsPage = lazy(() => import('./pages/Tweets/TweetsPage.jsx'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/tweets" element={<TweetsPage />}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Route>
    </Routes>
  );
};
