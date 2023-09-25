export interface PostResponse {
  totalPages: number;
  totalElements: number;
  content: Content[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
}

interface Content {
  id: string;
  title: string;
  description: string;
  photoLink: string;
  videoLink: string;
  likes: number;
  privatePost: boolean;
  userId: string;
  username: string;
  userPhotoLink: string;
}
