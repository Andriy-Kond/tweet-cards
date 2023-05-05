// ! RTK Query:
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // RTK Query поєднує в собі запити на бекенд (fetch.js) і Redux (sliceAsyncThunk.js (перейменоване у sliceContacts.js) )
// // Store і Reducer потрібні
// // productsApi = createApi
// export const contactsRTKQuery = createApi({
//   reducerPath: 'RTKQueryContacts', // те саме, що і у createSlice властивість name: 'fetchContacts',
//   baseQuery: fetchBaseQuery({
//     //fetchBaseQuery - спеціальний метод, якому ми передаємо baseUrl
//     baseUrl: 'https://6440c6e5792fe886a895ac5b.mockapi.io/', // з fetch.js
//   }),

//   // Підписка до endpoints для оновлення кешу на сторінці користувача:
//   tagTypes: ['contactsSubscribe'],

//   // Замість extraReducers:
//   endpoints: builder => ({
//     // endpoints - це запити на бекенд. Замість addCase
//     // builder.query означає get-запит. Все інше буде builder.mutation

//     getContacts: builder.query({
//       query: () => '/contacts', // Функція має повертати рядок запиту
//       // Ось це і все замість createAsyncThunk, initialState, sliceAsyncThunk(createSlice), addCase
//       // providesTags: ['contactsSubscribe'], // підписується на запит

//       providesTags: result =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: 'contactsSubscribe', id })),
//               { type: 'contactsSubscribe', id: 'LIST' },
//             ]
//           : [{ type: 'contactsSubscribe', id: 'LIST' }],
//     }),

//     addContact: builder.mutation({
//       query: newContact => {
//         console.log('builder.mutation -> newContact:', newContact);
//         return { url: 'contacts', method: 'POST', body: newContact };
//       },
//       invalidatesTags: [{ type: 'contactsSubscribe', id: 'LIST' }],
//     }),

//     deleteContact: builder.mutation({
//       query: idContact => ({ url: `/contacts/${idContact}`, method: 'DELETE' }),
//       invalidatesTags: [{ type: 'contactsSubscribe', id: 'LIST' }], // каже, що продукти оновились
//     }),
//   }),
// });

// // Експортуються хуки, які формуються з RTK Query на базі назви: перед назвою додається use, назва з великої букви, а після назви додається Query або Mutation:
// export const {
//   useGetContactsQuery,
//   useAddContactMutation,
//   useDeleteContactMutation,
// } = contactsRTKQuery;

// // Хуки Query повертають об'єкт
// // Хуки Mutation повертають масив
// // Першим параметром масиву від Mutation буде функція, яку ми викликаємо щоби видалити, створити, змінити і т.і. А другим параметром буде об'єкт, в якому приблизно ті ж дані, що є в об'єкті, який повертає хук з Query (isLoading, data, isError і т.і.)
