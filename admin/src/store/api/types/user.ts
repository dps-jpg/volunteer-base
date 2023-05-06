export interface PagingRequestTypes {
  limit: number;
  page: number;
  search: string;
}

export interface UserTypes {
  _id: string;
  email: string;
  firstName: string;
  secondName: string;
  middleName?: string;
  phone: string;
  city: string;
  hours: number;
  rank: string;
  age: number;
}

export interface GetUsersResponse {
  totalCount: number;
  data: UserTypes[];
}
