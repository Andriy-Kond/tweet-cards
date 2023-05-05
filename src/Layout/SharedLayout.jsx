import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Container } from '../components/Container/Container';
import { Header } from './Header/Header';
import { BigPreLoader } from '../components/Preloader/PreLoader'; // коли іменований export
import Footer from './Footer/Footer'; // коли export default

const Layout = () => {
  return (
    <Container>
      <main>
        <Header />
        <Suspense fallback={<BigPreLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;
