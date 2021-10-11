import React, { useEffect } from "react";
import { useComment } from "../../context/CommentContext";
import { useAuth } from "../../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import CommentForm from "./CommentForm";

const PostComment = ({ postId }) => {
  const { createComment, comments, fetchComments } = useComment();
  const { currrentUser } = useAuth();

  const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      await createComment(data);
      console.log("comment added");
    } catch (error) {
      console.log(error);
    }
  };

  const renderComments =
    comments.length !== 0 &&
    comments.map((cmnt) => {
      if (cmnt.postId === postId) {
        return (
          <article key={cmnt._id} className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src="https://bulma.io/images/placeholders/48x48.png"
                  alt=""
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
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
                <div className="dropdown-menu " id="dropdown-menu3" role="menu">
                  <div className="dropdown-content">
                    <Link
                      className="dropdown-item"
                      to={`/comments/edit/${cmnt._id}`}
                    >
                      Edit Comment
                    </Link>
                    <Link
                      className="dropdown-item"
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

  useEffect(() => {
    fetchComments();
  }, []);

  console.log(currrentUser);

  return (
    <div>
      <div className="tabs pt-5">
        <ul>
          <li className="is-active">
            <a href="">Comments</a>
          </li>
        </ul>
      </div>
      {renderComments}

      <CommentForm
        user={currrentUser}
        postId={postId}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostComment;
