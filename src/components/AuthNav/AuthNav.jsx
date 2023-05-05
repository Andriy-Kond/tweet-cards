import { StyledNavLink } from 'components/StyledNavLink/StyledNavLink';
import css from './AuthNav.module.css';
export const AuthNav = () => {
  return (
    <div className={css.authContainer}>
      <StyledNavLink to="/register">Register</StyledNavLink>
      <StyledNavLink to="/login">Login</StyledNavLink>
    </div>
  );
};
