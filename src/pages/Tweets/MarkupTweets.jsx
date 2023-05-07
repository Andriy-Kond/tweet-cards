import css from './TweetsPage.module.css';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';

import { toggleUserKey } from 'redux/sliceUserKey';
import { selectUserKey } from 'redux/selectors';
import { useState } from 'react';

export function MarkupTweets(props) {
  const { user, avatar, followers, tweets, id, updateTweet } = props;

  // const [followers, setFollowers] = useState(currentFollowers);

  const isExist = useSelector(selectUserKey);
  const dispatch = useDispatch();

  const toggleFollow = followers => {
    dispatch(toggleUserKey(id));

    console.log('toggleFollow >> followers:', followers);

    if (isExist.includes(id)) {
      followers = followers - 1;
      // setFollowers(followers - 1);
    } else {
      followers = followers + 1;
      // setFollowers(followers + 1);
    }

    updateTweet({ user, avatar, followers, tweets, id });
    console.log('followers :>> ', followers);
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
          <button
            type="button"
            onClick={() => {
              toggleFollow(followers);
            }}
          >
            {isExist.includes(id) ? 'FOLLOWING' : 'FOLLOW'}
          </button>
        </Card.Body>
      </Card>
    </li>
  );
}
