import css from './TweetsPage.module.css';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPage,
  setFilteredTweets,
  setUsersFilter,
  toggleUserSubscribe,
} from 'redux/sliceUserKey';
import {
  selectCurrentPage,
  selectFilteredTweets,
  selectUserKeys,
  selectUsersFilter,
} from 'redux/selectors';
import { useState } from 'react';
import {
  FOLLOW,
  FOLLOWING,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from 'Services/variables';
import { useGetUsersQuery, useUpdateTweetMutation } from 'redux/tweetsApi';
import { useEffect } from 'react';

export function MarkupTweets(props) {
  const {
    user,
    avatar,
    followers,
    tweets,
    id,
    // filtering
  } = props;
  const currentPage = useSelector(selectCurrentPage);
  const [updateTweet] = useUpdateTweetMutation();
  const dispatch = useDispatch();

  const userFilter = useSelector(selectUsersFilter);
  const isExist = useSelector(selectUserKeys);
  const [btnColor, setBtnColor] = useState(
    isExist.includes(id) ? SECONDARY_COLOR : PRIMARY_COLOR
  );

  // useEffect(() => {
  //   dispatch(setFilteredTweets(selectFilteredTweets));
  // }, [dispatch, userFilter]);

  const toggleFollow = followers => {
    dispatch(toggleUserSubscribe(id));
    if (isExist.includes(id)) {
      followers = followers - 1;
      setBtnColor(PRIMARY_COLOR);
    } else {
      followers = followers + 1;
      setBtnColor(SECONDARY_COLOR);
    }

    dispatch(setFilteredTweets());
    // const filteredTweets = filtering(userFilter);
    // dispatch(setFilteredTweets(filteredTweets));
    // dispatch(setCurrentPage(currentPage));
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
            {isExist.includes(id)
              ? FOLLOWING.toUpperCase()
              : FOLLOW.toUpperCase()}
          </button>
        </Card.Body>
      </Card>
    </li>
  );
}
