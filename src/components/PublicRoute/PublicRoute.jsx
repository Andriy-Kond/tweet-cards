import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserToken } from 'redux/auth/selectors';

// Якщо маршрут ОБМЕЖЕНИЙ (restricted) і користувач залогінений, то перекидаю на redirectTo
// Якщо маршрут НЕ ОБМЕЖЕНИЙ то перекидаю на сторінку home-page незалежно від того чи залогінений користувач, чи ні.
export default function PublicRoute({
  component,
  redirectTo = '/',
  restricted = false,
}) {
  // const isLogged = useSelector(selectIsLoggedIn);
  const isToken = useSelector(selectUserToken);

  // const shouldDirect = (isLogged || isToken) && restricted;
  const shouldDirect = isToken && restricted;
  return shouldDirect ? <Navigate to={redirectTo} /> : component;
  // return isLogged ? props.component : <Navigate to={props.redirectTo} />;
}

// export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const { isLoggedIn, isRefreshing } = useAuth();
//   const shouldRedirect = !isLoggedIn && !isRefreshing;

//   return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
// };
