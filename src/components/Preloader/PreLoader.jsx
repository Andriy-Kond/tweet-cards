import css from './PreLoader.module.css';

// Спінер завантаження
export const SmallPreLoader = () => {
  return (
    <div className={css.preloaderContainer}>
      <div className="spinner-grow spinner-grow-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export const BigPreLoader = () => {
  return (
    <div className="spinner-grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
