import css from './TweetsPage.module.css';
import { MarkupTweets } from './MarkupTweets';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserKey,
  selectUsersCards,
  selectUsersFilter,
} from 'redux/selectors';
import { useGetUsersQuery, useUpdateTweetMutation } from 'redux/tweetsApi';
import { setUsersCards, setUsersFilter } from 'redux/sliceUserKey';
import { useEffect, useState } from 'react';
import { BigPreLoader } from 'Layout/Preloader/PreLoader';
import PaginationList from 'Layout/PaginationList/PaginationList';

const TweetsPage = () => {
  const dispatch = useDispatch();
  const { data: usersCardsTweets, isLoading } = useGetUsersQuery(); // запит карток

  // Першим параметром масиву від Mutation буде функція, яку ми викликаємо щоби видалити, створити, змінити і т.і. А другим параметром буде об'єкт, в якому приблизно ті ж дані, щ оє в об'єкті, який повертає хук з Query (isLoading, data, isError і т.і.)
  const [updateTweet, obj] = useUpdateTweetMutation();

  const updateTweetFunction = async newQtyTweets => {
    await updateTweet({
      tweets: newQtyTweets,
      ...obj,
    });
  };

  const [currentPage, setCurrentPage] = useState(1); // поточна сторінка
  const [cardsPerPage] = useState(2); // карток на сторінку

  // Оновлення стану (встановлення карток локально)
  useEffect(() => {
    dispatch(setUsersCards(usersCardsTweets));
  }, [dispatch, usersCardsTweets]);
  const usersCards = useSelector(selectUsersCards); // збережені картки
  // const usersId = useSelector(selectUserKey);
  // console.log('TweetsPage >> usersId:', usersId);
  // console.log('TweetsPage >> tweets:', tweets);

  // console.log('usersId[0] :>> ', usersId[0]);

  // const filtered = tweets.filter(tweet => {
  //   for (let i = 0; i < usersId.length; i++) {
  //     if (tweet.id === usersId[i]) {
  //       return tweet.id;
  //     }
  //   }
  // });

  // Пагінація
  const lastIndex = currentPage * cardsPerPage; // оастанній індекс
  const firstIndex = lastIndex - cardsPerPage; // перший індекс
  const currentCard = usersCards?.slice(firstIndex, lastIndex); // картки поточної сторінки
  // if (usersCards) {
  //   console.log('TweetsPage >> firstIndex:', firstIndex);
  //   console.log('TweetsPage >> lastIndex:', lastIndex);
  //   console.log('TweetsPage >> currentCard:', currentCard);
  // }

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prevState => prevState + 1);
  const prevPage = () => setCurrentPage(prevState => prevState - 1);

  // Фільтрація твітів
  //  todo Dropdown із 3 опціями(оформлення на ваш розсуд): show all, follow, followings
  // const filteredTweets = filter
  //   ? tweets.filter(tweet =>
  //       tweet.user.toLowerCase().includes(filter.toLowerCase())
  //     )
  //   : tweets;

  //   return (
  //     <div>
  //       <h1>Це сторінка твітів</h1>
  //       <Filter />
  //       {isLoading ? (
  //         <BigPreLoader />
  //       ) : (
  //         filteredTweets?.length > 0 && (
  //           <>
  //             <ul className={css.list}>
  //               {filteredTweets.map(({ id, ...props }) => {
  //                 return (
  //                   <MarkupTweets key={id} id={id} {...props}></MarkupTweets>
  //                 );
  //               })}
  //             </ul>
  //             <PaginationList
  //               cardsPerPage={cardsPerPage}
  //               totalCards={tweets.length}
  //             />
  //           </>
  //         )
  //       )}
  //     </div>
  //   );
  // };

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
        currentCard?.length > 0 && (
          <>
            <ul className={css.list}>
              {currentCard.map(({ id, ...props }) => {
                return (
                  <MarkupTweets
                    key={id}
                    id={id}
                    updateTweetFunction={updateTweetFunction}
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
