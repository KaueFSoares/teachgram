export interface FriendListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ShorFriendItemResponse[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface ShorFriendItemResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  photo: string;
}
