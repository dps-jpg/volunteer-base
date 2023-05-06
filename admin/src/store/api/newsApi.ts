import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { GetNewsResponse } from 'store/api/types/news';
import { PagingRequestTypes } from 'store/api/types/user';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: baseQueryWithTokenRemove,
  tagTypes: ['news'],
  endpoints: (builder) => ({
    getNews: builder.query<GetNewsResponse, PagingRequestTypes>({
      query: (arg) => ({
        url: '/news',
        params: arg
      }),
      providesTags: ['news']
    }),
    deletePost: builder.mutation<any, string>({
      query: (arg) => ({
        url: `/news/delete/${arg}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['news']
    }),
    createPost: builder.mutation<any, FormData>({
      query: (arg) => ({
        url: '/news/create',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: ['news']
    })
  })
});

export const { useGetNewsQuery, useDeletePostMutation, useCreatePostMutation } = newsApi;
