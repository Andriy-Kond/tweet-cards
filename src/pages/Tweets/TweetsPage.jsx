import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from 'redux/tweetsApi';
import {
  setAllTweets,
  setFilteredTweets,
  setTotalPages,
  setUsersFilter,
} from 'redux/sliceUserKey';
import { PreLoader } from 'Layout/Preloader/PreLoader';
import { TweetCards } from 'components/TweetCards/TweetCards';
import { selectFilteredTweets, selectUsersFilter } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';
import { useEffect } from 'react';
import { MyDropdown } from 'components/Dropdown/Dropdown';

import { Error } from 'components/Error/Error';

const TweetsPage = () => {
  const dataQuery = useGetUsersQuery();
  const { data: allTweets, isLoading, isError, error } = dataQuery;

  const dispatch = useDispatch();
  const userFilter = useSelector(selectUsersFilter);

  const filteredTweets = useSelector(selectFilteredTweets);

  const renderingTweets = filteredTweets;

  const totalPages =
    renderingTweets?.length > 0
      ? Math.ceil(renderingTweets?.length / CARDS_PER_PAGE)
      : 1;

  useEffect(() => {
    dispatch(setAllTweets(allTweets));
    allTweets?.length > 0 && dispatch(setFilteredTweets());
    dispatch(setUsersFilter(userFilter));
    dispatch(setTotalPages(totalPages));
  }, [allTweets, dispatch, isError, isLoading, totalPages, userFilter]);

  return (
    <div>
      <h1>Це сторінка твітів</h1>

      <h1>
        <a href="/"> На головну</a>
      </h1>

      <h4>Фільтрація</h4>
      <MyDropdown />
      {isError && <Error error={error} />}
      {isLoading ? (
        <>
          <PreLoader isLoading={isLoading} />
        </>
      ) : (
        <>
          <TweetCards renderingTweets={filteredTweets} />
        </>
      )}
    </div>
  );
};

export default TweetsPage;
