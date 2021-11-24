import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  FC,
} from "react";
import xhr from "../utils/xhr";
import { Posts, Post } from "../interfaces/index";

interface PostProviderValues {
  createPost: (data: Post) => void;
  fetchPosts: any;
  fetchPost: any;
  editPost: any;
  posts: Array<Posts>;
  deletePost: any;
}

const initialProviderValue: PostProviderValues = {
  createPost: () => {},
  fetchPosts: () => {},
  fetchPost: () => {},
  editPost: () => {},
  deletePost: () => {},
  posts: [],
};

export const PostContext = createContext<PostProviderValues>(
  initialProviderValue
);

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider: FC = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const createPost = async (data: Post) => {
    try {
      await xhr.post("/posts", data);
      console.log("post added");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async (id: string) => {
    const res = await xhr.get(`/posts/${id}`);
    return res.data;
  };

  const editPost = async (id: string, data: string) => {
    try {
      await xhr.put(`/posts/edit/${id}`, data);
      console.log("post updated");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await xhr.delete(`/posts/delete/${id}`);
      console.log("post deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await xhr.get("/posts");
      const sortedPost = [...res.data] as any;
      sortedPost.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );

      setPosts(sortedPost);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value: PostProviderValues = {
    posts,
    fetchPosts,
    createPost,
    fetchPost,
    editPost,
    deletePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
