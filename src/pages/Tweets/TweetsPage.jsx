import { Filter } from 'components/Filter/Filter';
import UserCard from 'components/UserCard/UserCard';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { useGetUsersQuery } from 'redux/tweetsApi';
import { MarkupTweets } from './MarkupTweets';
import css from './TweetsPage.module.css';

const TweetsPage = () => {
  const { data: tweets } = useGetUsersQuery();
  // console.log('TweetsPage >> tweets:', tweets);
  const filter = useSelector(selectFilter);
  // console.log('TweetsPage >> filter:', filter);

  // Фільтрація твітів:
  const filteredTweets = filter
    ? tweets.filter(tweet =>
        tweet.user.toLowerCase().includes(filter.toLowerCase())
      )
    : tweets;

  // console.log('TweetsPage >> filteredTweets:', filteredTweets);

  return (
    <div>
      <h1>Це сторінка твітів</h1>

      <Filter />
      {filteredTweets?.length > 0 && (
        <>
          <ul className={css.list}>
            {filteredTweets.map(({ id, ...props }) => {
              return <MarkupTweets key={id} id={id} {...props}></MarkupTweets>;
            })}
          </ul>
        </>
      )}
      <UserCard />
    </div>
  );
};

// Для lazy(() => import лише через export default
export default TweetsPage;
