import css from './Header.module.css';
// import { Navigation } from '../Navigation/Navigation';
// import { AuthNav } from '../AuthNav/AuthNav';
import { UserMenu } from '../../components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectUserToken } from 'redux/auth/selectors';
import { StyledNavLink } from 'components/StyledNavLink/StyledNavLink';

export const Header = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isToken = useSelector(selectUserToken);

  // ^ Без окремих компонентів <Navigation> та <AuthNav>
  // Вирішується проблема хедера у мобільному варіанті меню
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary ${css.navContainer}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="./">
            LOGO
          </a>
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
            <ul
              className={`navbar-nav me-auto mb-2 mb-lg-0 ${css.ulContainer}`}
            >
              <li className="nav-item">
                <StyledNavLink to="/">Home</StyledNavLink>
              </li>
              <li className="nav-item">
                {isToken && (
                  <StyledNavLink to="/contacts">Contacts</StyledNavLink>
                )}
              </li>

              <li className={`nav-item ${css.navRight}`}>
                {isToken ? (
                  <UserMenu className="nav-link " />
                ) : (
                  <ul
                    className={`navbar-nav me-auto mb-2 mb-lg-0 ${css.ulContainer}`}
                  >
                    <li className="nav-item">
                      <StyledNavLink to="/register">Register</StyledNavLink>
                    </li>
                    <li className="nav-item">
                      <StyledNavLink to="/login">Login</StyledNavLink>
                    </li>
                  </ul>
                )}
                {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

  // ^ З окремими компонентами <Navigation> та <AuthNav>
  // Виникає проблема хедера у мобільному варіанті меню
  // return (
  //   <>
  //     <nav
  //       className={`navbar navbar-expand-lg bg-body-tertiary ${css.navContainer}`}
  //     >
  //       <div className="container-fluid">
  //         <a className="navbar-brand" href="./">
  //           LOGO
  //         </a>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#navbarSupportedContent"
  //           aria-controls="navbarSupportedContent"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>

  //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //           <ul
  //             className={`navbar-nav me-auto mb-2 mb-lg-0 ${css.ulContainer}`}
  //           >
  //             <li className="nav-item">
  //               <Navigation className="nav-link " />
  //             </li>
  //             <li className="nav-item">
  //               {isToken ? (
  //                 <UserMenu className="nav-link " />
  //               ) : (
  //                 <AuthNav className="nav-link " />
  //               )}
  //               {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </>
  // );
};
