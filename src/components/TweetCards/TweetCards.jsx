import { Error } from 'components/Error/Error';
import { MarkupTweets } from 'components/MarkupTweets/MarkupTweets';
import { PaginationList } from 'Layout/PaginationList/PaginationList';
import { PreLoader } from 'Layout/Preloader/PreLoader';
import { useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectDownloadedTweets,
  selectFilteredTweets,
} from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';
import css from './TweetCards.module.css';

export const TweetCards = ({ isLoading, isError, error, limitedTweets }) => {
  const filteredTweets = useSelector(selectFilteredTweets);
  const currentPage = useSelector(selectCurrentPage);
  const lastIndex = currentPage * CARDS_PER_PAGE;
  const currentTweets = filteredTweets?.slice(0, lastIndex);
  // const downloadedTweets = useSelector(selectDownloadedTweets);

  // const currentTweets = downloadedTweets?.slice(0, lastIndex);

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      {/* {currentTweets?.length > 0 && <RenderTweets tweets={currentTweets} />} */}

      {/* {currentTweets?.length > 0 && (
        <ul className={css.cardsList}>
          {currentTweets.map(({ id, ...props }) => {
            return <MarkupTweets key={id} id={id} {...props}></MarkupTweets>;
          })}
        </ul>
      )} */}

      {currentTweets?.length > 0 && (
        <ul className={css.cardsList}>
          {currentTweets.map(({ id, ...props }) => {
            return <MarkupTweets key={id} id={id} {...props}></MarkupTweets>;
          })}
        </ul>
      )}
      {isLoading && <PreLoader />}
      <PaginationList />
    </>
  );
};
