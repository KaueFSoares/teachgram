export interface Post {
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
