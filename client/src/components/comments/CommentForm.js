import React, { useRef } from "react";

const CommentForm = ({ postId, handleSubmit }) => {
  const commentRef = useRef();

  const onSubmit = () => {
    const data = {
      comment: commentRef.current.value,
      postId: postId,
    };
    handleSubmit(data);
  };
  return (
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/48x48.png" />
        </p>
      </figure>
      <div class="media-content">
        <form onSubmit={onSubmit}>
          <div class="field">
            <p class="control">
              <textarea
                class="textarea"
                ref={commentRef}
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button type="submit" class="button has-background-info">
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
