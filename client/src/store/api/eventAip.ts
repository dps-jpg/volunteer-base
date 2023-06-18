import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithTokenRemove } from 'store/api/common/baseQueryWithTokenRemove';
import { PagingRequestTypes } from 'shared/types/user';
import { EventTypes, GetEventsResponse, ParticipateEventRequest } from 'shared/types/event';

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: baseQueryWithTokenRemove,
  tagTypes: ['EventsPage', 'event'],
  endpoints: (builder) => ({
    getEvents: builder.query<GetEventsResponse, PagingRequestTypes>({
      query: (arg) => ({
        url: '/events',
        params: arg
      }),
      providesTags: ['EventsPage']
    }),
    getEventById: builder.query<EventTypes, { eventId: string; userId?: string }>({
      query: ({ eventId, userId }) => ({
        url: `/events/${eventId}`,
        params: { userId }
      }),
      providesTags: (result, error, arg) => [{ type: 'event', id: arg.eventId }]
    }),
    participateEvent: builder.mutation<any, ParticipateEventRequest>({
      query: (arg) => ({
        url: '/events/participate',
        method: 'POST',
        body: arg
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'event', id: arg.eventId }]
    })
  })
});

export const { useGetEventsQuery, useGetEventByIdQuery, useParticipateEventMutation } = eventApi;
