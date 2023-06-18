export interface EventTypes {
  _id: string;
  title: string;
  body: string;
  images: string[];
  hours: number;
  city: string;
  createdAt: string;
}

export interface MemberTypes {
  _id: string;
  userId: string;
  eventId: string;
  isTookPart: boolean;
  email: string;
  firstName: string;
  secondName: string;
  middleMame?: string;
}

export interface GetNewsResponse {
  totalCount: number;
  data: EventTypes[];
}
