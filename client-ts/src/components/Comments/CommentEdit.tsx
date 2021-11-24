import React, { useState, useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import { useComment } from "../../context/CommentContext";
import Modal from "../Modal";

const CommentEdit: FC = () => {
  const [comment, setComment] = useState<string | null>(null);
  const { editComment, fetchComment } = useComment();
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getComment = async () => {
      const data = await fetchComment(id);
      console.log(data);
      setComment(data.comment);
    };

    getComment();
  }, []);

  console.log(comment);

  const onEditComment = () => {
    const data = {
      comment: comment,
    };
    try {
      editComment(id, data);
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  const renderActions = () => {
    return (
      <div>
        <button onClick={onEditComment} className="button is-info">
          Edit
        </button>
        <button onClick={onCancel} className="button">
          Cancel
        </button>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="field">
        <textarea
          className="textarea is-info"
          placeholder="Write caption"
          onChange={(e: { target: HTMLTextAreaElement }) =>
            setComment(e.target.value)
          }
          value={comment}
          name="Comment"
        ></textarea>
      </div>
    );
  };

  return (
    <div>
      <Modal
        title="Edit Comment"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.goBack()}
      />
    </div>
  );
};

export default CommentEdit;
