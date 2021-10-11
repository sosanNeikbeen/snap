import React, { useContext, createContext, useState } from "react";
import xhr from "../utils/xhr";
export const CommentContext = createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const createComment = async (data) => {
    const res = await xhr.post("/comments", data);
    return res;
  };

  const fetchComment = async (id) => {
    const res = await xhr.get(`/comments/${id}`);
    return res.data;
  };

  const editComment = async (id, data) => {
    try {
      await xhr.put(`/comments/edit/${id}`, data);
      console.log("comment updated");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    try {
      await xhr.delete(`/comments/delete/${id}`);
      console.log("comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await xhr.get("/comments");
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    comments,
    fetchComments,
    createComment,
    fetchComment,
    editComment,
    deleteComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
