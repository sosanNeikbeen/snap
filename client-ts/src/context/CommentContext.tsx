import React, { useContext, createContext, useState, FC } from "react";
import xhr from "../utils/xhr";
import { Comments, Comment } from "../interfaces/index";

interface CommentProviderValues {
  createComment: (data: Comment) => void;
  fetchComments: any;
  fetchComment: any;
  editComment: any;
  comments: Array<Comments>;
  deleteComment: any;
}

const initialProviderValue: CommentProviderValues = {
  createComment: () => {},
  fetchComments: () => {},
  fetchComment: () => {},
  editComment: () => {},
  deleteComment: () => {},
  comments: [],
};

export const CommentContext = createContext<CommentProviderValues>(
  initialProviderValue
);

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider: FC = ({ children }) => {
  const [comments, setComments] = useState([]);

  const createComment = async (data: Comment) => {
    const res = await xhr.post("/comments", data);
    return res;
  };

  const fetchComment = async (id: string) => {
    const res = await xhr.get(`/comments/${id}`);
    return res.data;
  };

  const editComment = async (id: string, data: string) => {
    try {
      await xhr.put(`/comments/edit/${id}`, data);
      console.log("comment updated");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id: string) => {
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

  const value: CommentProviderValues = {
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
