import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";
// import { createStream } from "../../actions";
import { usePost } from "../../context/PostContext";

const StreamCreate = () => {
  const { createPost } = usePost();
  const onSubmit = (formValues) => {
    createPost(formValues);
  };

  return (
    <div className="box">
      <PostForm onSubmit={onSubmit} />
    </div>
  );
};

export default StreamCreate;
