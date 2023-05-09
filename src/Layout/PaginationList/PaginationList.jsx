import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectTotalPages } from 'redux/selectors';
import { incrementPage } from 'redux/sliceUserKey';

import css from './PaginationList.module.css';

export function PaginationList() {
  const dispatch = useDispatch();
  let currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const nextPage = () => {
    dispatch(incrementPage());
  };

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        id="end"
        disabled={currentPage === totalPages}
        onClick={nextPage}
        className={`${css.btn} ${css.loadMoreBtn}`}
      >
        Load more
      </button>
    </div>
  );
}
