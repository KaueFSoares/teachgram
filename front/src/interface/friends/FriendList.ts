export interface FriendList {
  totalPages: number;
  totalElements: number;
  friends: ShortFriendItem[];
  number: number;
  first: boolean;
  last: boolean;
  pageNumber: number;
}

export interface ShortFriendItem {
  id: string;
  name: string;
  email: string;
  username: string;
  photo: string;
}
