import { Navigate } from 'react-router-dom';

export default function PublicRoute({ redirectTo = '/' }) {
  return <Navigate to={redirectTo} />;
}
