import { StyledNavLink } from 'Services/StyledNavLink';
import css from './Header.module.css';

export const Header = () => {
  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${css.navContainer}`}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${css.ulContainer}`}>
            <li className="nav-item">
              <StyledNavLink to="/">Home</StyledNavLink>
            </li>

            <li className="nav-item">
              <StyledNavLink to="/tweets">Tweets</StyledNavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
