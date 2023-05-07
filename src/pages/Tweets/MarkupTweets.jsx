import css from './TweetsPage.module.css';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';

import { toggleUserKey } from 'redux/sliceUserKey';
import { selectUserKey } from 'redux/selectors';
import { useState } from 'react';

export function MarkupTweets(props) {
  const { user, avatar, followers, tweets, id, updateTweet } = props;

  const PRIMARY_COLOR = 'blue';
  const SECONDARY_COLOR = 'red';

  const isExist = useSelector(selectUserKey);
  const [btnColor, setBtnColor] = useState(
    isExist.includes(id) ? SECONDARY_COLOR : PRIMARY_COLOR
  );
  const dispatch = useDispatch();

  const toggleFollow = followers => {
    dispatch(toggleUserKey(id));

    if (isExist.includes(id)) {
      followers = followers - 1;
      setBtnColor(PRIMARY_COLOR);
    } else {
      followers = followers + 1;
      setBtnColor(SECONDARY_COLOR);
    }

    updateTweet({ user, avatar, followers, tweets, id });
  };

  const numberOptions = { style: 'decimal', minimumFractionDigits: 0 };

  return (
    <li className={css.listItem}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={avatar} />
        <Card.Body>
          <Card.Title>User {user}</Card.Title>
          <Card.Title>{tweets} TWEETS</Card.Title>
          <Card.Text>
            {followers.toLocaleString('en-US', numberOptions)} FOLLOWERS
          </Card.Text>
          {/* <Button variant="primary">FOLLOW</Button> */}
          <button
            type="button"
            style={{ backgroundColor: btnColor }}
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
