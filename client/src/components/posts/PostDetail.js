import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PostComment from "../comments/CommentList";
import { usePost } from "../../context/PostContext";

const PostDetail = () => {
  const [isPost, setIsPost] = useState();
  const { fetchPost } = usePost();
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
    return <div>Loading...</div>;
  }

  const { post, image, _id } = isPost;

  return (
    <section className="section p-4 pt-2">
      <article className="media is-mobile ">
        <figure className="image media-left">
          <img
            className="brand-rounded"
            src="https://bulma.io/images/placeholders/32x32.png"
          />
        </figure>
        <div className="media-content is-mobile">
          <div className="content">
            <p>
              <strong>John Smith</strong> <small>@johnsmith</small>{" "}
              <small>31m</small>
              <br />
            </p>
          </div>
        </div>
        <div className="media-right">
          <Dropdown>
            <div class="dropdown-menu " id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  View Profile
                </a>
                <Link class="dropdown-item" to={`/posts/edit/${_id}`}>
                  Edit Post
                </Link>
                <Link class="dropdown-item" to={`/posts/delete/${_id}`}>
                  Delete Post
                </Link>
              </div>
            </div>
          </Dropdown>
        </div>
      </article>

      <div className="container">
        <figure className="image ">
          <img src={image} />
        </figure>

        <p className="pt-3">
          {" "}
          <strong>John Smith</strong> {post}
        </p>
      </div>

      <PostComment postId={_id} />
    </section>
  );
};

export default PostDetail;
