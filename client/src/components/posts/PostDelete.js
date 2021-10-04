import React from "react";
import { useHistory } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import Modal from "../Modal";

const PostDelete = () => {
  const { deletePost } = usePost();
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const onDeletePost = (e) => {
    deletePost(id);
    history.push("/");
  };
  const onClickCancel = () => {
    history.goBack();
  };

  const renderActions = () => {
    return (
      <div>
        <button onClick={onDeletePost} className="button is-danger">
          Delete
        </button>
        <button onClick={onClickCancel} className="button">
          Cancel
        </button>
      </div>
    );
  };

  const renderContent = () => {
    return "Are you sure you want to delete this post";
  };

  return (
    <div>
      <Modal
        title="Delete Post"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

export default PostDelete;
