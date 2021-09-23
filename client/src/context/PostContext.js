import React, { useContext, createContext, useState, useEffect } from "react";
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
    return result.post;
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

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/posts");
      const result = await res.json();
      setPosts(result.posts);
    };
    fetchPosts();
  }, []);

  const value = {
    posts,
    createPost,
    fetchPost,
    editPost,
    deletePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
