import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from 'redux/tweetsApi';
import {
  setCurrentPage,
  setDownloadedTweets,
  setFilteredTweets,
  setIsDisabledLoadMoreBtn,
  setIsLoading,
  setIsShowLoadMoreBtn,
  setTotalPages,
  setUsersFilter,
} from 'redux/sliceUsers';
import { PreLoader } from 'Layout/Preloader/PreLoader';
import { TweetCards } from 'components/TweetCards/TweetCards';
import {
  selectCurrentPage,
  selectFilteredTweets,
  selectUsersFilter,
} from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';
import { useEffect } from 'react';
import { MyDropdown } from 'components/Dropdown/Dropdown';
import { Error } from 'components/Error/Error';
import css from './TweetsPage.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TweetsPage = () => {
  const dataQuery = useGetUsersQuery();
  const { data: limitedTweets, isLoading, isError, error } = dataQuery;
  const dispatch = useDispatch();
  const userFilter = useSelector(selectUsersFilter);
  const filteredTweets = useSelector(selectFilteredTweets);
  const totalPages =
    filteredTweets?.length > 0
      ? Math.ceil(filteredTweets?.length / CARDS_PER_PAGE)
      : 1;

  useEffect(() => {
    // dispatch(setAllTweets(allTweets)); // Замінено на setDownloadedTweets
    dispatch(setDownloadedTweets(limitedTweets));
    limitedTweets?.length > 0 && dispatch(setFilteredTweets());
    dispatch(setUsersFilter(userFilter));
    dispatch(setTotalPages(totalPages));

    dispatch(setIsShowLoadMoreBtn(true));
    dispatch(setIsDisabledLoadMoreBtn(false));
    dispatch(setIsLoading(isLoading));
    if (limitedTweets?.length < CARDS_PER_PAGE) {
      dispatch(setIsDisabledLoadMoreBtn(true));
    }
  }, [limitedTweets, dispatch, totalPages, userFilter, isLoading]);

  return (
    <div>
      <Link to="/" className={`btn btn-outline-primary ${css.btn} `}>
        На головну
      </Link>

      <div className={css.myDropdown}>
        <MyDropdown />
      </div>

      {/* {isError && <Error error={error} />} */}
      {isLoading && <PreLoader isLoading={isLoading} />}

      <TweetCards
        isLoading={isLoading}
        isError={isError}
        error={error}
        limitedTweets={limitedTweets}
      />
    </div>
  );
};

export default TweetsPage;
