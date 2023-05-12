import { RenderTweets } from 'components/RenderTweets/RenderTweets';
import { PaginationList } from 'Layout/PaginationList/PaginationList';
import { useSelector } from 'react-redux';
import { selectCurrentPage, selectFilteredTweets } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';

export const TweetCards = () => {
  const filteredTweets = useSelector(selectFilteredTweets);
  const currentPage = useSelector(selectCurrentPage);
  const lastIndex = currentPage * CARDS_PER_PAGE;
  const currentTweets = filteredTweets?.slice(0, lastIndex);

  return (
    <>
      {currentTweets?.length > 0 && <RenderTweets tweets={currentTweets} />}
      <PaginationList />
    </>
  );
};
