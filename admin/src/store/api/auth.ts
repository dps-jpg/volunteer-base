import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  endpoints: (builder) => ({
    auth: builder.mutation<AuthResponse, AuthRequest>({
      query: (arg) => ({
        url: '/login-admin',
        method: 'POST',
        body: arg
      })
    })
  })
});

export const useAuthMutation = authApi.useAuthMutation;
