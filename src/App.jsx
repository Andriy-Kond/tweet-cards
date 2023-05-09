import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { SharedLayout } from 'Layout/SharedLayout';
import { PublicRoute } from 'Layout/PublicRoute/PublicRoute';
import HomePage from 'pages/Home/HomePage';

const TweetsPage = lazy(() => import('./pages/Tweets/TweetsPage.jsx'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/tweets" element={<TweetsPage />}></Route>
        <Route path="*" element={<PublicRoute redirectTo="/" />}></Route>
      </Route>
    </Routes>
  );
};
