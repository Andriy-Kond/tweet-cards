import css from './PreLoader.module.css';

export const PreLoader = () => {
  return (
    <>
      <div className={css.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
