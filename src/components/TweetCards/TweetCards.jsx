import { RenderTweets } from 'components/RenderTweets/RenderTweets';
import { PaginationList } from 'Layout/PaginationList/PaginationList';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';

export const TweetCards = ({ renderingTweets }) => {
  const currentPage = useSelector(selectCurrentPage);
  const lastIndex = currentPage * CARDS_PER_PAGE;
  const firstIndex = lastIndex - CARDS_PER_PAGE;
  const currentTweets = renderingTweets?.slice(firstIndex, lastIndex);

  return (
    <>
      {currentTweets?.length > 0 && <RenderTweets tweets={currentTweets} />}
      <PaginationList />
    </>
  );
};
