import { Navigate } from 'react-router-dom';

export function PublicRoute({ redirectTo = '/' }) {
  return <Navigate to={redirectTo} />;
}
