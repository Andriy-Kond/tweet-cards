import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, selectTotalPages } from 'redux/selectors';
import {
  decrementPage,
  incrementPage,
  setCurrentPage,
} from 'redux/sliceUserKey';
import css from './PaginationList.module.css';

export function PaginationList() {
  const dispatch = useDispatch();
  let currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (totalPages < currentPage) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [currentPage, dispatch, totalPages]);

  const pageSelection = pageNumber => {
    dispatch(setCurrentPage(pageNumber));
  };
  const nextPage = () => dispatch(incrementPage());
  const prevPage = () => dispatch(decrementPage());

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {pageNumbers.map(number => {
          return (
            <li key={number}>
              <button
                className={
                  currentPage === number
                    ? `${css.btn} ${css.activeBtn}`
                    : css.btn
                }
                onClick={() => {
                  pageSelection(number);
                }}
              >
                {number}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className={`${css.list} ${css.listSideBtns}`}>
        <li>
          <button
            disabled={currentPage === 1}
            onClick={prevPage}
            className={`${css.btn} ${css.sidesBtn}`}
          >
            Prev Page
          </button>
        </li>
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={nextPage}
            className={`${css.btn} ${css.sidesBtn}`}
          >
            Next Page
          </button>
        </li>
      </ul>
    </div>
  );
}
