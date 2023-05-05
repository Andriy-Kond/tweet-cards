import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h4>
        Ой, а за цією адресою нічого нема. Як би дивно це не виглядало...
        {` ¯\\_(ツ)_/¯ `}
      </h4>
      <Link className="btn btn-outline-primary" to="/">
        Go to home page
      </Link>
    </>
  );
};

export default NotFoundPage;
