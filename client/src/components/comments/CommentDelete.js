import React from "react";
import Modal from "../Modal";
import { useHistory } from "react-router-dom";
import { useComment } from "../../context/CommentContext";

const CommentDelete = () => {
  const { deleteComment } = useComment();
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const onDeleteComment = (e) => {
    e.preventDefault();
    deleteComment(id);
    history.goBack();
  };
  const onClickCancel = () => {
    history.goBack();
  };

  const renderActions = () => {
    return (
      <div>
        <button onClick={onDeleteComment} className="button is-danger">
          Delete
        </button>
        <button onClick={onClickCancel} className="button">
          Cancel
        </button>
      </div>
    );
  };

  const renderContent = () => {
    return "Are you sure you want to delete this comment";
  };
  return (
    <div>
      <Modal
        title="Delete Comment"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

export default CommentDelete;
