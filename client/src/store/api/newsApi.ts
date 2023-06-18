import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { GetMainNewsResponse, GetNewsResponse, PostTypes } from 'shared/types/news';
import { PagingRequestTypes } from 'shared/types/user';

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
    getMainNews: builder.query<GetMainNewsResponse, void>({
      query: () => '/news/main'
    }),
    getPostById: builder.query<PostTypes, string>({
      query: (arg) => `/news/${arg}`
    })
  })
});

export const { useGetNewsQuery, useGetMainNewsQuery, useGetPostByIdQuery } = newsApi;
