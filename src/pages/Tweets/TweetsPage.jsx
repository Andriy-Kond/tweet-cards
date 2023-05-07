import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from 'redux/tweetsApi';
import {
  decrementPage,
  incrementPage,
  setAllTweets,
  setCurrentPage,
  setFilteredTweets,
  setUsersFilter,
} from 'redux/sliceUserKey';

import { BigPreLoader } from 'Layout/Preloader/PreLoader';
import { TweetCards } from 'components/TweetCards/TweetCards';
import {
  selectUserKeys,
  selectFilteredTweets,
  selectUsersFilter,
  selectAllTweets,
  selectCurrentPage,
} from 'redux/selectors';
import { ALL, CARDS_PER_PAGE, FOLLOW, FOLLOWING } from 'Services/variables';
import { useEffect } from 'react';
import PaginationList from 'Layout/PaginationList/PaginationList';

const TweetsPage = () => {
  const dispatch = useDispatch();
  const { data: allTweets, isLoading } = useGetUsersQuery(); // запит карток

  // const allNewTweets = useSelector(selectAllTweets);
  const userFilter = useSelector(selectUsersFilter);

  const followingKeys = useSelector(selectUserKeys);
  const filteredTweets = useSelector(selectFilteredTweets);

  // dispatch(setUsersFilter(userFilter));
  // dispatch(setFilteredTweets(allTweets));
  // useEffect(() => {
  //   // followingKeys.length === 0 && - не можна, бо не оновлюється.
  //   dispatch(setFilteredTweets(allTweets));
  // }, [allTweets, dispatch, followingKeys.length]);

  useEffect(() => {
    dispatch(setUsersFilter(userFilter));
    dispatch(setAllTweets(allTweets));
  }, [allTweets, dispatch, userFilter]);

  //  Фільтрація по dropDown show all, follow, followings
  // todo dispatch() на перше завантаження сторінки, якщо вже у LS є якийсь фільтр

  // const filtering = filteredValue => {
  //   let filteredTweets;
  //   switch (filteredValue) {
  //     case FOLLOWING:
  //       filteredTweets = allTweets.filter(tweet =>
  //         followingKeys.includes(tweet.id)
  //       );
  //       break;
  //     case FOLLOW:
  //       filteredTweets = allTweets.filter(
  //         tweet => !followingKeys.includes(tweet.id)
  //       );
  //       break;
  //     case ALL:
  //       filteredTweets = allTweets;
  //       break;
  //     default:
  //       break;
  //   }
  //   return filteredTweets;
  // };

  const setFilter = e => {
    dispatch(setCurrentPage(1));
    dispatch(setUsersFilter(e.target.value));
    dispatch(setFilteredTweets());

    // dispatch(setCurrentPage(1));
    // dispatch(setUsersFilter(e.target.value));
    // const filteredTweets = filtering(e.target.value);
    // dispatch(setFilteredTweets(filteredTweets));
  };

  // const filt = filtering(userFilter);
  // console.log('TweetsPage >> filt:', filt);

  // const currentPage = useSelector(selectCurrentPage);
  // const renderingTweets = userFilter === ALL ? allTweets : filteredTweets;
  // const totalPages = Math.ceil(renderingTweets.length / CARDS_PER_PAGE);
  // const paginate = pageNumber => {
  //   dispatch(setCurrentPage(pageNumber));
  // };
  // const nextPage = () => dispatch(incrementPage());
  // const prevPage = () => dispatch(decrementPage());
  return (
    <div>
      <h1>Це сторінка твітів</h1>

      <h1>
        <a href="/"> На головну</a>
      </h1>

      <h4>Фільтрація</h4>
      {/* <select onChange={setFilter}> */}
      <select value={userFilter} onChange={setFilter}>
        <option value={ALL}>Show all</option>
        <option value={FOLLOW}>Follow</option>
        <option value={FOLLOWING}>followings</option>
      </select>

      {isLoading ? (
        <BigPreLoader />
      ) : (
        <>
          <TweetCards
            renderingTweets={userFilter === ALL ? allTweets : filteredTweets}
            // filtering={filtering}
          />

          {/* <PaginationList
            totalCards={renderingTweets.length}
            paginate={paginate}
          />
          <button disabled={currentPage === 1} onClick={prevPage}>
            Prev Page
          </button>
          <button disabled={currentPage === totalPages} onClick={nextPage}>
            Next Page
          </button> */}
        </>
      )}
    </div>
  );
};

export default TweetsPage;
