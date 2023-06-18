import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { PagingRequestTypes } from 'store/api/types/user';
import { GetNewsResponse, MemberTypes } from 'store/api/types/event';
import { memo } from 'react';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithTokenRemove,
  tagTypes: ['EventsPage', 'members'],
  endpoints: (builder) => ({
    getEvents: builder.query<GetNewsResponse, PagingRequestTypes>({
      query: (arg) => ({
        url: '/events',
        params: arg
      }),
      providesTags: ['EventsPage']
    }),
    createEvent: builder.mutation<any, FormData>({
      query: (arg) => ({
        url: '/events/create',
        body: arg,
        method: 'POST'
      }),
      invalidatesTags: ['EventsPage']
    }),
    deleteEvent: builder.mutation<any, string>({
      query: (arg) => ({
        url: `/events/delete/${arg}`,
        body: arg,
        method: 'DELETE'
      }),
      invalidatesTags: ['EventsPage']
    }),
    getEventMembers: builder.query<MemberTypes[], string>({
      query: (arg) => `/event-members/${arg}`,
      providesTags: (result, error, arg) => [{ type: 'members', id: arg }]
    }),
    confirmParticipation: builder.mutation<any, { memberId: string; userId: string; eventId: string }>({
      query: (arg) => ({
        url: '/event-members/confirm',
        method: 'PATCH',
        body: arg
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'members', id: arg.eventId }]
    })
  })
});

export const { useGetEventsQuery, useCreateEventMutation, useDeleteEventMutation, useGetEventMembersQuery, useConfirmParticipationMutation } = eventApi;
