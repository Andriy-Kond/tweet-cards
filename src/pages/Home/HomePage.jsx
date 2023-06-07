import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={css.hero}>
      <div className={css.homeContainer}>
        <h2 className={css.homeTitle}>Welcome!</h2>
        <p className={css.homeText}>
          Here you will find cards with tweets from different users with the
          interactivity of the database at the click of a button.
        </p>
        <p className={css.homeText}>
          Feel free to explore the cards by clicking on the cards provided{' '}
          <Link className={css.homeLink} to="/tweets">
            link
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default HomePage;
