import React from "react";
import PostForm from "./PostForm";
import { useHistory } from "react-router-dom";
import { usePost } from "../../context/PostContext";

const StreamCreate = () => {
  const history = useHistory();
  const { createPost } = usePost();
  const onSubmit = async (formValues) => {
    await createPost(formValues);
    history.push("/");
  };

  return (
    <div className="box">
      <PostForm onSubmit={onSubmit} />
    </div>
  );
};

export default StreamCreate;
