import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard({ user, avatar, followers, tweets, id }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>User {user}</Card.Title>
        <Card.Title>{tweets} TWEETS</Card.Title>
        <Card.Text>{followers} FOLLOWERS</Card.Text>
        <Button variant="primary">FOLLOW</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
