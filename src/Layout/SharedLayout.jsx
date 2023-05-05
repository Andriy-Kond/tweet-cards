import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { BigPreLoader } from './Preloader/PreLoader';

export const SharedLayout = () => {
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
