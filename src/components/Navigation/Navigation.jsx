import css from './Navigation.module.css';
import { selectUserToken } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { StyledNavLink } from 'components/StyledNavLink/StyledNavLink';

export const Navigation = () => {
  const isToken = useSelector(selectUserToken);

  return (
    <div className={css.navigationContainer}>
      <StyledNavLink to="/">Home</StyledNavLink>
      {isToken && <StyledNavLink to="/contacts">Contacts</StyledNavLink>}
    </div>
  );
};
