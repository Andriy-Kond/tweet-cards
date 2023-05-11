import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from 'redux/tweetsApi';
import {
  setCurrentPage,
  setDownloadedTweets,
  setFilteredTweets,
  setIsLoading,
  setTotalPages,
  setUsersFilter,
} from 'redux/sliceUsers';
import { PreLoader } from 'Layout/Preloader/PreLoader';
import { TweetCards } from 'components/TweetCards/TweetCards';
import {
  selectFilteredTweets,
  selectFilter,
  selectCurrentPage,
  selectDownloadedTweets,
} from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';
import { useEffect } from 'react';
import { MyDropdown } from 'components/Dropdown/Dropdown';
import { Error } from 'components/Error/Error';
import css from './TweetsPage.module.css';
import { Link } from 'react-router-dom';

const TweetsPage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const {
    data: limitedTweets,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery(currentPage);
  // const { data: limitedTweets, isLoading, isError, error } = getQuery;

  const downloadedTweets = useSelector(selectDownloadedTweets);
  const userFilter = useSelector(selectFilter);
  const filteredTweets = useSelector(selectFilteredTweets);

  // const totalPages =
  //   filteredTweets?.length > 0
  //     ? Math.ceil(filteredTweets?.length / CARDS_PER_PAGE)
  //     : 1;

  // dispatch(setIsLoading(isLoading));

  useEffect(() => {
    if (limitedTweets?.length > 0) {
      dispatch(setDownloadedTweets(limitedTweets));
    }
  }, [dispatch, limitedTweets]);

  // useEffect(() => {
  //   allTweets?.length > 0 && dispatch(setFilteredTweets(allTweets));
  //   dispatch(setUsersFilter(userFilter));
  //   dispatch(setTotalPages(totalPages));
  // }, [allTweets, dispatch, totalPages, userFilter]);

  return (
    <div>
      <Link to="/" className={`btn btn-outline-primary ${css.btn} `}>
        На головну
      </Link>

      <div className={css.myDropdown}>
        <MyDropdown />
      </div>

      {isError && <Error error={error} />}
      {isLoading ? <PreLoader /> : <TweetCards />}
    </div>
  );
};

export default TweetsPage;
