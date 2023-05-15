import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import { useUpdateTweetMutation } from 'redux/tweetsApi';
import { setFilteredTweets, toggleUserSubscribe } from 'redux/sliceUsers';
import { selectFollowingUsers } from 'redux/selectors';
import {
  FOLLOW,
  FOLLOWING,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from 'Services/variables';
import logo from '../../assets/logo-go-it.png';
import messages from '../../assets/messages.png';
import defaultAvatar from '../../assets/default-avatar.png';
import css from './MarkupTweets.module.css';

export function MarkupTweets(props) {
  const { user, avatar, followers, tweets, id } = props;
  const [updateTweet] = useUpdateTweetMutation();
  const dispatch = useDispatch();
  const followingUsers = useSelector(selectFollowingUsers);
  const [btnColor, setBtnColor] = useState(
    followingUsers.includes(id) ? SECONDARY_COLOR : PRIMARY_COLOR
  );

  const toggleFollow = followers => {
    dispatch(toggleUserSubscribe(id));
    if (followingUsers.includes(id)) {
      followers = followers - 1;
      setBtnColor(PRIMARY_COLOR);
      Notiflix.Notify.warning(`You unsubscribed to ${user}`);
    } else {
      followers = followers + 1;
      setBtnColor(SECONDARY_COLOR);
      Notiflix.Notify.success(`You subscribed to ${user}`);
    }

    dispatch(setFilteredTweets());
    updateTweet({ user, avatar, followers, tweets, id });
  };

  const numberOptions = { style: 'decimal', minimumFractionDigits: 0 };

  return (
    <li className={css.listItem}>
      <img
        src={logo}
        alt="GoIT"
        className={css.logo}
        heigh="22px"
        width="76px"
      />
      <img
        src={messages}
        alt="messages"
        className={css.messages}
        height="168"
        width="308px"
      />

      <div className={css.line}>
        <div className={css.circle}>
          <img
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
            className={css.avatar}
            height="80px"
            width="80px"
          />
        </div>
      </div>

      <p className={`${css.title} ${css.tweets}`}>
        {tweets.toLocaleString('en-US', numberOptions)} TWEETS
      </p>

      <p className={`${css.title} ${css.followers}`}>
        {followers.toLocaleString('en-US', numberOptions)} FOLLOWERS
      </p>
      <button
        type="button"
        className={css.btn}
        style={{ backgroundColor: btnColor }}
        onClick={() => {
          toggleFollow(followers);
        }}
      >
        {followingUsers.includes(id) ? FOLLOWING : FOLLOW}
      </button>
    </li>
  );
}
