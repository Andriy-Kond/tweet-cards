import css from './UserForm.module.css';
import Notiflix from 'notiflix';
import { useState } from 'react';

// ^ Рефакторінг у Redux
// Для звертання до стору Redux - useSelector, для запуску необхідної дії (необхідного редюсера) - useDispatch
import { useDispatch, useSelector } from 'react-redux';
// import { addInStateContact } from '../../store/SlicePhoneBook';
// import { nanoid } from '@reduxjs/toolkit';
import { selectContacts } from 'redux/phonebook/selectorsPhonebook';
import { addContact } from 'redux/phonebook/fetchContacts';

export const UserForm = () => {
  // dispatch - це як тригер, що відбулась подія. Але нам треба вказати яка саме
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  // Локальні стейти немає сенсу переносити у глобальний Redux:
  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  // Записую дані полів інпут у відповідні стейти
  const getInput = ({ target: { name, value } }) => {
    if (name === 'name') {
      setUserName(value);
    } else {
      setUserNumber(value);
    }
  };

  // Спроба записати новий контакт
  const setContact = e => {
    e.preventDefault();

    // Перевірка чи є вже такий контакт:
    const isExist = contacts.find(contact => contact.name === userName);

    if (isExist) {
      // alert працює як return
      // alert(`${userName} is already in contacts`);
      Notiflix.Notify.warning(`User "${userName}" is already in contacts`);
      return;
    } else {
      // спроба створити об'єкт:
      const isCreated = dispatch(
        addContact({ name: userName, number: userNumber })
      );

      // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
      if (isCreated) {
        Notiflix.Notify.success(`Contact "${userName}" added successfully!`);
        setUserName('');
        setUserNumber('');
      }
    }
  };

  // Повертаю розмітку:
  return (
    <form className={css.userFormWrapper} onSubmit={setContact}>
      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor="UserName">
          Name
        </label>

        <input
          className="form-control me-2"
          // type="search"
          placeholder="Enter contact name here"
          aria-label="User Name"
          // className={css.formInput}
          id="UserId"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={getInput}
          value={userName}
        />
      </div>

      <div className={css.inputWrapper}>
        <label className={css.formLabel} htmlFor="UserNumber">
          Phone Number
        </label>
        <input
          className="form-control me-2"
          // type="search"
          placeholder="Enter contact phone number here"
          aria-label="Phone number"
          // className={css.formInput}
          id="number"
          onChange={getInput}
          value={userNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button className="btn btn-outline-primary" type="submit">
        Add contact
      </button>
    </form>
  );
};

// ! RTK Query:
// import css from './UserForm.module.css';
// import { useState } from 'react';

// // ^ Рефакторінг у RTK Query
// import {
//   useAddContactMutation,
//   useGetContactsQuery,
// } from 'store/contactsRTKQueryApi';

// export const UserForm = () => {
//   // Локальні стейти немає сенсу переносити у глобальний Redux:
//   const [userName, setUserName] = useState('');
//   const [userNumber, setUserNumber] = useState('');

//   // * При використанні RTK Query:
//   // const data = useGetContactsQuery();
//   // console.log('UserForm >> data:', data);
//   const { data: contacts } = useGetContactsQuery();
//   const [addContact] = useAddContactMutation();

//   // Записую дані полів інпут у відповідні стейти
//   const getInput = ({ target: { name, value } }) => {
//     if (name === 'name') {
//       setUserName(value);
//     } else {
//       setUserNumber(value);
//     }
//   };

//   // Спроба записати новий контакт
//   const setNewContact = async e => {
//     e.preventDefault();

//     // Перевірка чи є вже такий контакт:
//     const isExist = contacts.find(contact => contact.name === userName);

//     if (isExist) {
//       // alert працює як return
//       alert(`${userName} is already in contacts`);
//     } else {
//       // спроба створити об'єкт:
//       const isCreated = await addContact({
//         name: userName,
//         number: userNumber,
//       });
//       console.log('setContact >> isCreated.data:', isCreated.data);

//       // Якщо новий об'єкт створений успішно, то обнуляємо поля інпутів у формі
//       if (isCreated) {
//         setUserName('');
//         setUserNumber('');
//       }
//     }
//   };

//   // Повертаю розмітку:
//   return (
//     <form className={css.addUserForm} onSubmit={setNewContact}>
//       <div className={css.userFormWrapper}>
//         <div className={css.inputWrapper}>
//           <label className={css.formLabel} htmlFor="UserId">
//             Name
//           </label>
//           <input
//             className={css.formInput}
//             id="UserId"
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             onChange={getInput}
//             value={userName}
//           />
//         </div>

//         <div className={css.inputWrapper}>
//           <label className={css.formLabel} htmlFor="number">
//             Phone Number
//           </label>
//           <input
//             className={css.formInput}
//             id="number"
//             onChange={getInput}
//             value={userNumber}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </div>

//         <button className={css.submitBtn} type="submit">
//           Add contact
//         </button>
//       </div>
//     </form>
//   );
// };
