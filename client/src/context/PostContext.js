import React, { useContext, createContext, useState, useEffect } from "react";
import xhr from "../utils/xhr";

export const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const createPost = async (data) => {
    try {
      await xhr.post("/posts", data);
      console.log("post added");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async (id) => {
    const res = await xhr.get(`/posts/${id}`);
    return res.data;
  };

  const editPost = async (id, data) => {
    try {
      await xhr.put(`/posts/edit/${id}`, data);
      console.log("post updated");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
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
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    fetchPosts,
    createPost,
    fetchPost,
    editPost,
    deletePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
