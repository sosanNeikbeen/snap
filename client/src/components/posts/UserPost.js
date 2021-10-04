import React from "react";
import { Link } from "react-router-dom";
import { usePost } from "../../context/PostContext";

const UserPost = () => {
  const { posts } = usePost();
  return (
    <div className="columns is-variable is-multiline pt-5 is-1 is-mobile">
      {posts &&
        posts.map((post) => (
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
        ))}
    </div>
  );
};

export default UserPost;
