import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const PostContext = createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const createPost = (data) => {
    axios
      .post("/posts", data)
      .then(function () {
        console.log("added");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchPost = async (id) => {
    const res = await fetch(`/posts/${id}`);
    const result = await res.json();
    return result.stream;
  };

  const editPost = async (id, data) => {
    await axios
      .put(`/posts/edit/${id}`, data)
      .then(function () {
        console.log("updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/posts");
      const result = await res.json();
      setPosts(result.posts);
    };
    fetchPosts();
  }, []);

  console.log(posts);

  const value = {
    posts,
    createPost,
    fetchPost,
    editPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
