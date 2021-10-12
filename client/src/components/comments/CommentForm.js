import React, { useRef } from "react";

const CommentForm = ({ postId, handleSubmit, user }) => {
  const commentRef = useRef();

  const onSubmit = () => {
    const data = {
      comment: commentRef.current.value,
      postId: postId,
      userId: user.userId,
    };
    handleSubmit(data);
  };

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image ">
          <img
            className="pic-square"
            src={
              user.picture
                ? user.picture
                : "https://bulma.io/images/placeholders/48x48.png"
            }
            alt=""
          />
        </p>
      </figure>
      <div className="media-content">
        <form onSubmit={onSubmit}>
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                ref={commentRef}
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button type="submit" className="button has-background-info">
                Post comment
              </button>
            </p>
          </div>
        </form>
      </div>
    </article>
  );
};

export default CommentForm;
