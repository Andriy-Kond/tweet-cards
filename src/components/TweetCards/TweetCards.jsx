import { RenderTweets } from 'components/RenderTweets/RenderTweets';
import { PaginationList } from 'Layout/PaginationList/PaginationList';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectDownloadedTweets,
  selectFilteredTweets,
} from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';

export const TweetCards = () => {
  // const currentPage = useSelector(selectCurrentPage);
  // const lastIndex = currentPage * CARDS_PER_PAGE;
  // const filteredTweets = useSelector(selectFilteredTweets);
  // const currentTweets = filteredTweets?.slice(0, lastIndex);

  const downloadedTweets = useSelector(selectDownloadedTweets);

  return (
    <>
      {/* {currentTweets?.length > 0 && ( */}

      <RenderTweets currentTweets={downloadedTweets} />
      {/* )} */}
      <PaginationList />
    </>
  );
};
