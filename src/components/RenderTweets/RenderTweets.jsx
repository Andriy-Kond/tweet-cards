import PaginationList from 'Layout/PaginationList/PaginationList';
import { MarkupTweets } from 'pages/Tweets/MarkupTweets';
import { useSelector } from 'react-redux';
import { selectCurrentPage } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';

export const RenderTweets = props => {
  const {
    tweets,
    paginate,
    nextPage,
    prevPage,
    renderingTweets,
    // filtering
  } = props;

  // const currentPage = useSelector(selectCurrentPage);
  // const totalPages = Math.ceil(renderingTweets.length / CARDS_PER_PAGE);

  return (
    <>
      <ul>
        {tweets.map(({ id, ...props }) => {
          return (
            <MarkupTweets
              key={id}
              id={id}
              // filtering={filtering}
              {...props}
            ></MarkupTweets>
          );
        })}
      </ul>
      {/* <PaginationList totalCards={renderingTweets.length} paginate={paginate} />
      <button disabled={currentPage === 1} onClick={prevPage}>
        Prev Page
      </button>
      <button disabled={currentPage === totalPages} onClick={nextPage}>
        Next Page
      </button> */}
    </>
  );
};
