import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tweetsAPI = createApi({
  reducerPath: 'fetchTweets',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6454a8f5a74f994b33457e38.mockapi.io/',
  }),

  tagTypes: ['tweetsSubscribe'],

  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',

      providesTags: ['tweetsSubscribe'],
    }),

    updateTweet: builder.mutation({
      query: data => {
        return { url: `/users/${data.id}`, method: 'PUT', body: data };
      },
      invalidatesTags: ['tweetsSubscribe'],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateTweetMutation } = tweetsAPI;
