import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRemove } from './common/baseQueryWithTokenRemove';
import { GetUsersResponse, PagingRequestTypes } from 'store/api/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithTokenRemove,
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, PagingRequestTypes>({
      query: (arg) => ({
        url: '/admin/users',
        params: arg
      })
    }),
    downloadUsers: builder.query<string, void>({
      query: () => '/users/download'
    })
  })
});

export const { useGetUsersQuery, useLazyDownloadUsersQuery } = userApi;
