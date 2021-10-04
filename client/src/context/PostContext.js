import React, { useContext, createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const createPost = async (data) => {
    try {
      await axios.post("/posts", data);
      console.log("post added");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async (id) => {
    const res = await fetch(`/posts/${id}`);
    const result = await res.json();
    return result;
  };

  const editPost = async (id, data) => {
    try {
      await axios.put(`/posts/edit/${id}`, data);
      console.log("post updated");
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/delete/${id}`);
      console.log("post deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
