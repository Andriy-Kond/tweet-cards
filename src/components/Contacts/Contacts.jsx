import css from './Contacts.module.css';
import { useSelector } from 'react-redux';
import { MarkupContacts } from './MarkupContacts';
import {
  selectContacts,
  selectFilter,
} from 'redux/phonebook/selectorsPhonebook';
// import { useEffect } from 'react';
// import { fetchContacts } from 'redux/phonebook/fetchContacts';

export const Contacts = () => {
  // const dispatch = useDispatch();
  // Виклик "операції":
  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  // Забираю лист контактів зі store Redux:
  // useSelector приймає функцію, яка приймає увесь store з Redux
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  // Фільтрація контактів:
  const filteredContacts = filter
    ? contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  // Рендер відфільтрованих контактів:
  return (
    filteredContacts.length > 0 && (
      <ul className={css.list}>
        {filteredContacts.map(({ name, number, id }) => {
          return (
            <MarkupContacts
              key={id}
              name={name}
              number={number}
              id={id}
            ></MarkupContacts>
          );
        })}
      </ul>
    )
  );
};

// ! RTK Query:
// import css from './Contacts.module.css';

// // ^ Рефакторінг у Redux
// import { useSelector } from 'react-redux';
// import { MarkupContacts } from './MarkupContacts';
// import { selectFilter } from 'store/selectors';

// // ^ Рефакторінг у RTK Query
// import { useGetContactsQuery } from 'store/contactsRTKQueryApi';

// export const Contacts = () => {
//   // * При використанні RTK Query:
//   // const data = useGetContactsQuery();
//   // console.log('UserForm >> data:', data);
//   const { data: contacts } = useGetContactsQuery();

//   // Забираю лист контактів зі store Redux:
//   // useSelector приймає функцію, яка приймає увесь store з Redux
//   const filter = useSelector(selectFilter);

//   // Фільтрація контактів:
//   const filteredContacts = filter
//     ? contacts.filter(({ name }) =>
//         name.toLowerCase().includes(filter.toLowerCase())
//       )
//     : contacts;

//   // Рендер відфільтрованих контактів:
//   return (
//     filteredContacts?.length > 0 && (
//       <ul className={css.list}>
//         {filteredContacts.map(({ name, number: number, id }) => {
//           return (
//             <MarkupContacts
//               key={id}
//               name={name}
//               number={number}
//               id={id}
//             ></MarkupContacts>
//           );
//         })}
//       </ul>
//     )
//   );
// };
