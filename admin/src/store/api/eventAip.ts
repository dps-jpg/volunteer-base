import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { PagingRequestTypes } from 'store/api/types/user';
import { GetNewsResponse } from 'store/api/types/event';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithTokenRemove,
  tagTypes: ['events'],
  endpoints: (builder) => ({
    getEvents: builder.query<GetNewsResponse, PagingRequestTypes>({
      query: (arg) => ({
        url: '/events',
        params: arg
      }),
      providesTags: ['events']
    }),
    createEvent: builder.mutation<any, FormData>({
      query: (arg) => ({
        url: '/events/create',
        body: arg,
        method: 'POST'
      }),
      invalidatesTags: ['events']
    }),
    deleteEvent: builder.mutation<any, string>({
      query: (arg) => ({
        url: `/events/delete/${arg}`,
        body: arg,
        method: 'DELETE'
      }),
      invalidatesTags: ['events']
    })
  })
});

export const { useGetEventsQuery, useCreateEventMutation, useDeleteEventMutation } = eventApi;
