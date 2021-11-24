interface User {
  userId: string;
  email: string;
  name: string;
  location: string;
  picture: string;
  isLoggedIn: boolean;
  _id?: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface RegisterUserData {
  name: string;
  location: string;
  email: string;
  password: string;
}

interface Comments {
  comment: string;
  createdAt: string;
  postId: string;
  updatedAt: string;
  userId: User;
  _id: string;
}
interface Comment {
  comment: string;
  postId: string;
  userId: string;
}

interface Posts {
  createdAt: number | Date;
  image: string;
  post: string;
  updatedAt: string;
  userId: User;
  _id: string;
}

interface Post {
  post: string;
  image: string;
  userId: string;
}

interface ConversationData {
  createdAt: string;
  members: Array<string>;
  _id: string;
}

interface MessageData {
  conversationId: string;
  createdAt: string;
  sender: User;
  text: string;
  updatedAt: string;
  _id: string;
}

export type {
  User,
  RegisterUserData,
  LoginUserData,
  Comments,
  Posts,
  Comment,
  Post,
  ConversationData,
  MessageData,
};
