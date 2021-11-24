import React, { useState, useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import { usePost } from "../../context/PostContext";
import Modal from "../Modal";

const PostEdit: FC = () => {
  const [post, setPost] = useState<string | null>(null);
  const { editPost, fetchPost } = usePost();
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(id);
      setPost(data.post);
    };

    getPost();
  }, []);

  const onEditPost = () => {
    const data = {
      post: post,
    };
    try {
      editPost(id, data);
      history.push("/");
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
        <button onClick={onEditPost} className="button is-info">
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
            setPost(e.target.value)
          }
          value={post}
          name="post"
        ></textarea>
      </div>
    );
  };

  return (
    <div>
      <Modal
        title="Edit Post"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push("/")}
      />
    </div>
  );
};

export default PostEdit;
