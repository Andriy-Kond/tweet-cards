import { RenderTweets } from 'components/RenderTweets/RenderTweets';
import PaginationList from 'Layout/PaginationList/PaginationList';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage } from 'redux/selectors';
import {
  decrementPage,
  incrementPage,
  setCurrentPage,
} from 'redux/sliceUserKey';

import { CARDS_PER_PAGE } from 'Services/variables';

export const TweetCards = ({
  renderingTweets,
  // filtering
}) => {
  // Пагінація

  // const [currentPage, setCurrentPage] = useState(1); // не підходить, бо не скидається при зміні фільтру
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const lastIndex = currentPage * CARDS_PER_PAGE; // оастанній індекс
  const firstIndex = lastIndex - CARDS_PER_PAGE; // перший індекс
  const currentTweets = renderingTweets?.slice(firstIndex, lastIndex); // картки поточної сторінки

  const paginate = pageNumber => {
    dispatch(setCurrentPage(pageNumber));
  };
  // const nextPage = () => setCurrentPage(prevState => prevState + 1);
  // const prevPage = () => setCurrentPage(prevState => prevState - 1);

  const nextPage = () => dispatch(incrementPage());
  const prevPage = () => dispatch(decrementPage());

  // const currentPage = useSelector(selectCurrentPage);
  const totalPages =
    renderingTweets.length > 0
      ? Math.ceil(renderingTweets.length / CARDS_PER_PAGE)
      : 1;

  return (
    <>
      {currentTweets?.length > 0 && (
        <RenderTweets
          tweets={currentTweets}
          renderingTweets={renderingTweets}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          // filtering={filtering}
        />
      )}
      <PaginationList totalPages={totalPages} paginate={paginate} />
      <button disabled={currentPage === 1} onClick={prevPage}>
        Prev Page
      </button>
      <button disabled={currentPage === totalPages} onClick={nextPage}>
        Next Page
      </button>
    </>
  );
};
