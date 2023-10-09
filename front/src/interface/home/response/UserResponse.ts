export interface UserResponse {
  id: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  bio: string;
  photo: string;
  friendsCount: number;
  postsCount: number;
}
