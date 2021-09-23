import React, { useRef } from "react";
import { useComment } from "../../context/CommentContext";
import { useHistory, Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import CommentForm from "./CommentForm";

const PostComment = ({ postId }) => {
  const { createComment, comments } = useComment();

  const history = useHistory();

  const handleSubmit = async (data) => {
    await createComment(data);
    history.push("/");
  };

  const renderComments = comments.map((cmnt) => {
    if (cmnt.postId === postId) {
      return (
        <article key={cmnt._id} class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/48x48.png" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Barbara Middleton</strong>
                <br />
                {cmnt.comment}
                <br />
              </p>
            </div>
          </div>
          <div className="media-right">
            <Dropdown>
              <div class="dropdown-menu " id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <Link class="dropdown-item" to="/">
                    Edit Comment
                  </Link>
                  <Link
                    class="dropdown-item"
                    to={`/comments/delete/${cmnt._id}`}
                  >
                    Delete Comment
                  </Link>
                </div>
              </div>
            </Dropdown>
          </div>
        </article>
      );
    }
  });

  console.log(comments);
  console.log(postId);

  return (
    <div>
      <div class="tabs pt-5">
        <ul>
          <li class="is-active">
            <a>Comments</a>
          </li>
        </ul>
      </div>
      {renderComments}

      <CommentForm postId={postId} handleSubmit={handleSubmit} />
    </div>
  );
};

export default PostComment;
