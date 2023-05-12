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
import css from './TweetsPage.module.css';
import { Link } from 'react-router-dom';

const TweetsPage = () => {
  const dataQuery = useGetUsersQuery();
  const { data: allTweets, isLoading, isError, error } = dataQuery;
  const dispatch = useDispatch();
  const userFilter = useSelector(selectUsersFilter);
  const filteredTweets = useSelector(selectFilteredTweets);
  const totalPages =
    filteredTweets?.length > 0
      ? Math.ceil(filteredTweets?.length / CARDS_PER_PAGE)
      : 1;

  useEffect(() => {
    dispatch(setAllTweets(allTweets));
    allTweets?.length > 0 && dispatch(setFilteredTweets());
    dispatch(setUsersFilter(userFilter));
    dispatch(setTotalPages(totalPages));
  }, [allTweets, dispatch, isError, isLoading, totalPages, userFilter]);

  return (
    <div>
      <Link to="/" className={`btn btn-outline-primary ${css.btn} `}>
        На головну
      </Link>

      <div className={css.myDropdown}>
        <MyDropdown />
      </div>
      {isError && <Error error={error} />}
      {isLoading ? <PreLoader isLoading={isLoading} /> : <TweetCards />}
    </div>
  );
};

export default TweetsPage;
