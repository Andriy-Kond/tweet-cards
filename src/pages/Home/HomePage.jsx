import css from './Home.module.css';

const Home = () => {
  return (
    <div>
      <h1 style={css.title}>
        Task manager welcome page{' '}
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </h1>
    </div>
  );
};

export default Home;
