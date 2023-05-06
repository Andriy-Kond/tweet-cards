import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserKey } from 'redux/selectors';
import { setUserKey, toggleUserKey, unSetUserKey } from 'redux/sliceUserKey';

function UserCard({ user, avatar, followers, tweets, id }) {
  // console.log('UserCard >> id:', id);
  // console.log('UserCard >> user:', user);
  const isFollow = useSelector(selectUserKey);
  console.log('UserCard >> isFollow:', isFollow);

  const dispatch = useDispatch();
  const toggleFollow = () => {
    // dispatch(unSetUserKey(id));

    dispatch(toggleUserKey(id));
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>User {user}</Card.Title>
        <Card.Title>{tweets} TWEETS</Card.Title>
        <Card.Text>{followers} FOLLOWERS</Card.Text>
        {/* <Button variant="primary">FOLLOW</Button> */}
        <button type="button" onClick={toggleFollow}>
          {isFollow.includes(id) ? 'UNFOLLOW' : 'FOLLLOW'}
        </button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
