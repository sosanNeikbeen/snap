import React, { FC } from "react";
import { Link } from "react-router-dom";
import { usePost } from "../../context/PostContext";

const UserPost: FC = () => {
  const { posts } = usePost();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  const renderPosts =
    posts.length !== 0 &&
    posts.map((post) => {
      if (post.userId._id === id) {
        return (
          <div key={post._id} className="column p-0 is-one-quarter  ">
            <Link to={`/posts/${post._id}`}>
              <img
                className=""
                style={{ height: "90%", width: "95%" }}
                src={post.image}
                alt="user post"
              />
            </Link>
          </div>
        );
      }
    });

  return (
    <div className="columns is-variable is-multiline pt-5 is-1 is-mobile">
      {renderPosts}
    </div>
  );
};

export default UserPost;
