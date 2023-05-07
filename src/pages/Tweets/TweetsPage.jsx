import css from './TweetsPage.module.css';
import { MarkupTweets } from './MarkupTweets';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsersCards, selectUsersFilter } from 'redux/selectors';
import { useGetUsersQuery, useUpdateTweetMutation } from 'redux/tweetsApi';
import { setUsersCards, setUsersFilter } from 'redux/sliceUserKey';
import { useEffect, useState } from 'react';
import { BigPreLoader } from 'Layout/Preloader/PreLoader';
import PaginationList from 'Layout/PaginationList/PaginationList';

const TweetsPage = () => {
  const dispatch = useDispatch();
  const { data: usersCardsTweets, isLoading } = useGetUsersQuery(); // запит карток

  // const [updateTweet, obj] = useUpdateTweetMutation();
  const [updateTweet] = useUpdateTweetMutation();

  const [currentPage, setCurrentPage] = useState(1); // поточна сторінка
  const [cardsPerPage] = useState(2); // карток на сторінку

  // Оновлення стану (встановлення карток локально)
  useEffect(() => {
    dispatch(setUsersCards(usersCardsTweets));
  }, [dispatch, usersCardsTweets]);
  const usersCards = useSelector(selectUsersCards); // збережені картки
  // const usersId = useSelector(selectUserKey);

  // Пагінація
  const lastIndex = currentPage * cardsPerPage; // оастанній індекс
  const firstIndex = lastIndex - cardsPerPage; // перший індекс
  const currentCards = usersCards?.slice(firstIndex, lastIndex); // картки поточної сторінки

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevState => prevState + 1);
  const prevPage = () => setCurrentPage(prevState => prevState - 1);

  //  Фільтрація по dropDown show all, follow, followings
  const setFilter = e => {
    const tag = e.target.dataset.id;
    dispatch(setUsersFilter(tag));
  };

  const userFilter = useSelector(selectUsersFilter);

  switch (userFilter) {
    case 'all':
      break;
    case 'followings':
      // const filteredTweets = tweets.filter(tweet => {
      //   return;
      // });
      break;
    default:
      break;
  }
  // const filteredTweets = filter
  //   ? tweets.filter(tweet =>
  //       tweet.user.toLowerCase().includes(filter.toLowerCase())
  //     )
  //   : tweets;

  // todo Кнопка back на хоум сторінку
  return (
    <div>
      <h1>Це сторінка твітів</h1>
      <ul>
        <li data-id="all">
          <button onClick={setFilter}>show all</button>
        </li>
        <li data-id="follow">
          <button onClick={setFilter}>follow</button>
        </li>
        <li data-id="followings">
          <button onClick={setFilter}>followings</button>
        </li>
      </ul>

      {isLoading ? (
        <BigPreLoader />
      ) : (
        currentCards?.length > 0 && (
          <>
            <ul className={css.list}>
              {currentCards.map(({ id, ...props }) => {
                return (
                  <MarkupTweets
                    key={id}
                    id={id}
                    updateTweet={updateTweet}
                    {...props}
                  ></MarkupTweets>
                );
              })}
            </ul>
            <PaginationList
              cardsPerPage={cardsPerPage}
              totalCards={usersCardsTweets.length}
              paginate={paginate}
            />
            <button onClick={prevPage}>Prev Page</button>
            <button onClick={nextPage}>Next Page</button>
          </>
        )
      )}
    </div>
  );
};

export default TweetsPage;
