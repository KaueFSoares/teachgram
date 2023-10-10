export interface SingleFriendProfileResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  photo: string;
  friendsCount: number;
  postsCount: number;
  isFriend: boolean;
}
