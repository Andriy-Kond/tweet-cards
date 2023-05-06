import css from './TweetsPage.module.css';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';

import { toggleUserKey } from 'redux/sliceUserKey';
import { selectUserKey } from 'redux/selectors';

export function MarkupTweets(props) {
  const { user, avatar, followers, tweets, id, updateTweet } = props;

  const increment = tweets => tweets + 1;
  const decrement = tweets => tweets - 1;

  const isExist = useSelector(selectUserKey);
  const dispatch = useDispatch();
  const toggleFollow = async () => {
    dispatch(toggleUserKey(id));

    if (isExist.includes(id)) {
      increment();
    } else {
      decrement();
    }

    await updateTweet(...props, tweets);
  };

  return (
    <li className={css.listItem}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title>User {user}</Card.Title>
          <Card.Title>{tweets} TWEETS</Card.Title>
          <Card.Text>{followers} FOLLOWERS</Card.Text>
          {/* <Button variant="primary">FOLLOW</Button> */}
          <button type="button" onClick={toggleFollow}>
            {isExist.includes(id) ? 'FOLLOWING' : 'FOLLOW'}
          </button>
        </Card.Body>
      </Card>
    </li>
  );
}
