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
}

export interface RegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  middleName?: string;
  phone?: string;
  city: string;
}

export interface GetUsersResponse {
  totalCount: number;
  data: UserTypes[];
}
