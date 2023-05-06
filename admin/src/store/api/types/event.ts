export interface EventTypes {
  _id: string;
  title: string;
  body: string;
  images: string[];
  hours: number;
  city: string;
  createdAt: string;
}

export interface GetNewsResponse {
  totalCount: number;
  data: EventTypes[];
}
