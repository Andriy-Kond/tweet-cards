import { useDispatch, useSelector } from 'react-redux';
import { useGetUsersQuery } from 'redux/tweetsApi';
import {
  setAllTweets,
  setFilteredTweets,
  setTotalPages,
  setUsersFilter,
} from 'redux/sliceUserKey';
import { BigPreLoader } from 'Layout/Preloader/PreLoader';
import { TweetCards } from 'components/TweetCards/TweetCards';
import { selectFilteredTweets, selectUsersFilter } from 'redux/selectors';
import { CARDS_PER_PAGE } from 'Services/variables';
import { useEffect } from 'react';
import { MyDropdown } from 'components/Dropdown/Dropdown';
import css from './TweetsPage.module.css';
import Notiflix, { Loading } from 'notiflix';

const TweetsPage = () => {
  const dataQuery = useGetUsersQuery();
  const { data: allTweets, isLoading, isError, error } = dataQuery;
  console.log('TweetsPage >> isLoading:', isLoading);

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
      {isError && (
        <div className={css.error}>
          {Notiflix.Notify.failure(`Увага помилка!`)}
          <h1 className={css.errorTitle}>Помилка!</h1>

          <h4 className={css.errorDetails}>Деталі помилки:</h4>
          <p>
            <b>data:</b> {error.data}
          </p>
          <p>
            <b>error:</b> {error.error}
          </p>
          <p>
            <b>originalStatus:</b> {error.originalStatus}
          </p>
          <p>
            <b>status:</b> {error.status}
          </p>

          <p className={css.errorText}>
            Якщо ви бачите "<b>originalStatus:</b> 429", то це значить, що ви
            зробили забагато запитів на сервер.
          </p>
          <p>
            Астанавітєсь! Тобто... Схаменіться! Оновіть сторінку і надалі робіть
            запити на сервер не так швидко!
          </p>
          <p>Наші гноми втомлюються!!!</p>
        </div>
      )}
      {isLoading ? (
        <>
          <BigPreLoader />
          {Loading.dots()}
        </>
      ) : (
        <>
          <TweetCards renderingTweets={filteredTweets} />
          {Loading.remove()}
        </>
      )}
    </div>
  );
};

export default TweetsPage;
