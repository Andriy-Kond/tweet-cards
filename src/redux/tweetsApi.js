import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query поєднує в собі запити на бекенд (fetch.js) і Redux (sliceAsyncThunk.js)
// Store і Reducer потрібні
// productsApi = createApi
export const tweetsAPI = createApi({
  reducerPath: 'fetchTweets', // те саме, що і у createSlice властивість name: 'fetchContacts',
  baseQuery: fetchBaseQuery({
    //fetchBaseQuery - спеціальний метод, якому ми передаємо baseUrl
    baseUrl: 'https://6454a8f5a74f994b33457e38.mockapi.io/', // з fetch.js
  }),

  // Підписка до endpoints для оновлення кешу на сторінці користувача:
  tagTypes: ['tweetsSubscribe'],

  // Замість extraReducers:
  endpoints: builder => ({
    // endpoints - це запити на бекенд. Замість addCase
    // builder.query означає get-запит. Все інше буде builder.mutation

    getUsers: builder.query({
      query: () => '/users', // Функція має повертати рядок запиту
      // Ось це і все замість createAsyncThunk, initialState, sliceAsyncThunk(createSlice), addCase

      providesTags: ['tweetsSubscribe'], // підписується на запит
      // providesTags: result => {
      //   // console.log('result:', result.length);

      //   return result
      //     ? [
      //         ...result.map(({ id }) => ({ type: 'tweetsSubscribe', id })),

      //         { type: 'tweetsSubscribe', id: 'LIST' },
      //       ]
      //     : [{ type: 'tweetsSubscribe', id: 'LIST' }];
      // },
    }),

    updateTweet: builder.mutation({
      query: data => {
        console.log('data:', data);
        return { url: `/users/${data.id}`, method: 'PUT', body: data };
      },
      invalidatesTags: ['tweetsSubscribe'],
      // invalidatesTags: [{ type: 'tweetsSubscribe', id: 'LIST' }],
    }),

    // deleteTweet: builder.mutation({
    //   query: idTweet => ({ url: `/contacts/${idTweet}`, method: 'DELETE' }),
    //   invalidatesTags: [{ type: 'tweetsSubscribe', id: 'LIST' }], // каже, що продукти оновились
    // }),
  }),
});

// Експортуються хуки, які формуються з RTK Query на базі назви: перед назвою додається use, назва з великої букви, а після назви додається Query або Mutation:
export const { useGetUsersQuery, useUpdateTweetMutation } = tweetsAPI;
// export const { useGetUsersQuery, useAddTweetMutation, useDeleteTweetMutation } =
//   tweetsAPI;

// Хуки Query повертають об'єкт
// Хуки Mutation повертають масив
// Першим параметром масиву від Mutation буде функція, яку ми викликаємо щоби видалити, створити, змінити і т.і. А другим параметром буде об'єкт, в якому приблизно ті ж дані, що є в об'єкті, який повертає хук з Query (isLoading, data, isError і т.і.)
