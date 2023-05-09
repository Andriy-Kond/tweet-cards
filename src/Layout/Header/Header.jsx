import { Link } from 'react-router-dom';
import { StyledNavLink } from 'Services/StyledNavLink';
import css from './Header.module.css';

export const Header = () => {
  return (
    <nav className={` ${css.navContainer} navbar navbar-expand-lg  `}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          GoIT
        </Link>
        <button
          className={`navbar-toggler ${css.mr}`}
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
