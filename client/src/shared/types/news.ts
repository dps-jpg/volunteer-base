export interface PostTypes {
  _id: string;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
}

export interface GetNewsResponse {
  totalCount: number;
  data: PostTypes[];
}

export interface GetMainNewsResponse {
  main: PostTypes;
  news: PostTypes[];
}
