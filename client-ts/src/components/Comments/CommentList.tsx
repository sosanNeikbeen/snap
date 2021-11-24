import React, { useEffect, FC } from "react";
import { useComment } from "../../context/CommentContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import CommentForm from "./CommentForm";

interface Props {
  postId: string;
}

const PostComment: FC<Props> = ({ postId }) => {
  const { createComment, comments, fetchComments } = useComment();
  const { currentUser } = useAuth();
  const { userId } = currentUser;

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
              <p className="image ">
                <img
                  className="pic-square"
                  src={
                    cmnt.userId.picture
                      ? cmnt.userId.picture
                      : "https://bulma.io/images/placeholders/48x48.png"
                  }
                  alt=""
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{cmnt.userId.name}</strong>
                  <br />
                  {cmnt.comment}
                  <br />
                </p>
              </div>
            </div>
            <div className="media-right">
              {cmnt.userId._id === userId ? (
                <Dropdown>
                  <div
                    className="dropdown-menu "
                    id="dropdown-menu3"
                    role="menu"
                  >
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
              ) : (
                ""
              )}
            </div>
          </article>
        );
      }
    });

  useEffect(() => {
    fetchComments();
  }, []);

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
        user={currentUser}
        postId={postId}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PostComment;
