import css from './Container.module.css';

export const Container = ({ children }) => {
  return <div className={`${css.container} ${css.background}`}>{children}</div>;
};
