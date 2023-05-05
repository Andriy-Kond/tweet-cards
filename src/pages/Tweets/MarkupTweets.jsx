// import PropTypes from 'prop-types';
import UserCard from 'components/UserCard/UserCard';
import css from './TweetsPage.module.css';

// import { useDeleteContactMutation } from 'store/contactsRTKQueryApi';

export function MarkupTweets(props) {
  // * При використанні RTK Query:
  // & Хуки Query-запиту повертають об'єкт
  // const data = useGetTweetsQuery();
  // console.log('UserForm >> data:', data);
  // const { isLoading, data: contacts, isError } = useGetContactsQuery();

  // & Хуки Mutation-запитів повертають масив
  // const [deleteContact, delInfo] = useDeleteContactMutation();
  // console.log('MarkupContacts >> delInfo:', delInfo);
  // delInfo - це об'єкт

  // const handleDeleteContact = async () => {
  //   const del = await deleteContact(id);
  //   console.log('handleDeleteContact >> del.data:', del.data);
  //   return del;
  // };

  return (
    <li className={css.listItem}>
      <UserCard
        {...props}
        // user={user}
        // avatar={avatar}
        // followers={followers}
        // tweets={tweets}
        // id={id}
      />
      {/* <button className={css.deleteBtn} onClick={handleDeleteContact}>
        {delInfo.isLoading ? <b>Deleting...</b> : 'Delete'}
      </button> */}
    </li>
  );
}

// MarkupContacts.propTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
