import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

export const CommentContext = createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const createComment = async (data) => {
    try {
      await axios.post("/comments", data);
      console.log("comment added");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComment = async (id) => {
    const res = await fetch(`/comments/${id}`);
    const result = await res.json();
    return result.post;
  };

  const editComment = async (id, data) => {
    try {
      await axios.put(`/comments/edit/${id}`, data);
      console.log("comment updated");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    try {
      await axios.delete(`/comments/delete/${id}`);
      console.log("comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/comments");
      const result = await res.json();
      setComments(result.comments);
    };
    fetchComments();
  }, []);

  const value = {
    comments,
    createComment,
    fetchComment,
    editComment,
    deleteComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
