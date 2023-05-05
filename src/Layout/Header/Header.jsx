import { StyledNavLink } from 'Layout/StyledNavLink/StyledNavLink';

export const Header = () => {
  return (
    <>
      <nav>
        <a href="/">LOGO</a>
        <ul>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/tweets">Tweets</StyledNavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
