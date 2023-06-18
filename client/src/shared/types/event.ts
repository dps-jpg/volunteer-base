export interface EventTypes {
  _id: string;
  title: string;
  body: string;
  images: string[];
  hours: number;
  city: string;
  createdAt: string;
  isMember?: boolean;
}

export interface ParticipateEventRequest {
  userId: string;
  eventId: string;
}

export interface GetEventsResponse {
  totalCount: number;
  data: EventTypes[];
}
