export interface PostTypes {
  _id: string;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
  isMain: boolean;
}

export interface GetNewsResponse {
  totalCount: number;
  data: PostTypes[];
}
