import css from './ContactsPage.module.css';
import { SmallPreLoader } from 'components/Preloader/PreLoader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/phonebook/selectorsPhonebook';

import { Filter } from 'components/Filter/Filter';
import { UserForm } from 'components/UserForm/UserForm';
import { Contacts } from 'components/Contacts/Contacts';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/phonebook/fetchContacts';

const ContactsPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contactsList = useSelector(selectContacts);
  // console.log('ContactsPage >> contactsList:', contactsList);

  // Для додаткового оновлення контактів, щоб спрацьовував код після contactsList.length > 0 &&
  // Перенесено з contacts.jsx
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <div className={css.contactsContainer}>
        <div className={css.contactsItem}>
          <h2>Phonebook</h2>
          <UserForm />
        </div>
        {contactsList.length > 0 && (
          <div>
            <div className={css.contactsItem}>
              <h2>Contacts</h2>
              <Filter />
            </div>
            <div className={css.contactsItem}>
              <div className={css.contactsPreloader}>
                <p>List of contacts</p>
                <div className={css.preloader}>
                  {isLoading && !error && (
                    <>
                      <SmallPreLoader /> <SmallPreLoader /> <SmallPreLoader />
                    </>
                  )}
                </div>
              </div>
              <Contacts />
              {error && <h2>Error: {error}</h2>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactsPage;
