import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Dropdown from "../Dropdown";
import PostComment from "../Comments/CommentList";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner";
import { Posts } from "../../interfaces/index";

const PostDetail: FC = () => {
  const [isPost, setIsPost] = useState();
  const { fetchPost } = usePost();
  const { currentUser } = useAuth();
  const currentUserId = currentUser.userId;
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(id);
      setIsPost(data);
    };

    getPost();
  }, []);

  if (!isPost) {
    return (
      <div className="pt-6">
        <Spinner />
      </div>
    );
  }

  const { post, image, _id, userId, createdAt }: Posts = isPost;

  return (
    <section className="section p-4 pt-2">
      <article className="media is-mobile ">
        <figure className="image media-left">
          <img
            className="pic-rounded"
            src={
              userId.picture
                ? userId.picture
                : "https://bulma.io/images/placeholders/32x32.png"
            }
            alt=""
          />
        </figure>
        <div className="media-content is-mobile">
          <div className="content">
            <p>
              <strong>{userId.name}</strong>{" "}
              <small>
                {" "}
                <ReactTimeAgo date={createdAt} timeStyle="round" />
              </small>
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
                  to={`/users/profile/${userId._id}`}
                >
                  View Profile
                </Link>
                {userId._id === currentUserId ? (
                  <>
                    <Link className="dropdown-item" to={`/posts/edit/${_id}`}>
                      Edit Post
                    </Link>
                    <Link className="dropdown-item" to={`/posts/delete/${_id}`}>
                      Delete Post
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Dropdown>
        </div>
      </article>

      <div className="container">
        <figure className="image ">
          <img src={image} alt="" />
        </figure>

        <p className="pt-3">
          {" "}
          <strong>{userId.name}</strong> {post}
        </p>
      </div>

      <PostComment postId={_id} />
    </section>
  );
};

export default PostDetail;
