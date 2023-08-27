import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { readLocalStorage } from 'shared/lib/localStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: _API_,
  prepareHeaders: (headers) => {
    const token = readLocalStorage('token');
    if (token && typeof token === 'string') {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseQueryWithTokenRemove: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    localStorage.removeItem('token');
  }
  return result;
};
