import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { CARDS_PER_PAGE } from 'Services/variables';

export const tweetsAPI = createApi({
  reducerPath: 'fetchTweets',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6454a8f5a74f994b33457e38.mockapi.io/',
  }),
  tagTypes: ['tweetsSubscribe'],
  endpoints: builder => ({
    // all array:
    getUsers: builder.query({
      query: () => '/users',

      providesTags: ['tweetsSubscribe'],
    }),

    // // for each page:
    // getUsers: builder.query({
    //   query: currentPage => {
    //     return `/users/?p=${currentPage}&l=${CARDS_PER_PAGE}`;
    //   },
    //   providesTags: ['tweetsSubscribe'],
    // }),

    updateTweet: builder.mutation({
      query: data => {
        return { url: `/users/${data.id}`, method: 'PUT', body: data };
      },
      invalidatesTags: ['tweetsSubscribe'],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateTweetMutation } = tweetsAPI;
