import PublicRoute from 'Layout/PublicRoute/PublicRoute';
import { SharedLayout } from 'Layout/SharedLayout';
import HomePage from 'pages/Home/HomePage';
import { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

const TweetsPage = lazy(() => import('./pages/Tweets/TweetsPage.jsx'));

export const App = () => {
  // * Логіка для обробки токена при перезавантаженні сторінки:
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch();
  // }, [dispatch]);
  // */ Логіка для обробки токена при перезавантаженні сторінки:

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/tweets" element={<TweetsPage />}></Route>

        {/* // todo редірект на головну: */}
        <Route path="*" element={<PublicRoute redirectTo="/" />}></Route>
        {/* //??? або так: */}
        {/* <Route path="*" element={<Navigate to="/" />}></Route> */}
      </Route>
    </Routes>
  );
};
