import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { RegistrationRequest, UserTypes } from 'shared/types/user';

interface AuthRequest {
  email: string;
  password: string;
}

interface User {
  login: string;
  accessToken: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithTokenRemove,
  tagTypes: ['me'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (arg) => ({
        url: '/login',
        method: 'POST',
        body: arg
      })
    }),
    registration: builder.mutation<{ accessToken: string }, RegistrationRequest>({
      query: (arg) => ({
        url: '/registration',
        method: 'POST',
        body: arg
      })
    }),
    getMe: builder.query<UserTypes, void>({
      query: () => '/me'
    })
  })
});

export const { useLoginMutation, useRegistrationMutation, useGetMeQuery } = authApi;
