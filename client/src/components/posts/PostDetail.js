import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PostComment from "./PostComment";
import { usePost } from "../../context/PostContext";

const PostDetail = () => {
  const [isPost, setIsPost] = useState();
  const [isActive, setisActive] = useState(false);
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

  const { post, image } = isPost;

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
          <div class={`dropdown is-right ${isActive ? "is-active" : ""}`}>
            <div class="dropdown-trigger">
              <span
                class="icon is-small"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
                onClick={() => {
                  setisActive(!isActive);
                }}
              >
                <i class="fas fa-angle-down" aria-hidden="true">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </i>
              </span>
            </div>
            <div class="dropdown-menu " id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                  View Profile
                </a>
                <a href="#" class="dropdown-item">
                  Edit Post
                </a>
                <a href="#" class="dropdown-item">
                  Delete Post
                </a>
              </div>
            </div>
          </div>
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

      <PostComment />
    </section>
  );
};

export default PostDetail;
