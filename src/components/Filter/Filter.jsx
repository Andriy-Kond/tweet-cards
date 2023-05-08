import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const getInput = ({ target: { value } }) => {
    console.log('getInput >> value:', value);

    dispatch(setFilter({ value }));
  };

  return (
    <div className={css.inputWrapper}>
      <label htmlFor="searchInput">Find tweets by name</label>
      <input
        id="searchInput"
        type="text"
        name="filter"
        onChange={getInput}
        value={filter}
      />
    </div>
  );
};
