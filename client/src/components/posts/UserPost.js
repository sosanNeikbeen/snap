import React from "react";
import { Link } from "react-router-dom";
import { usePost } from "../../context/PostContext";

const UserPost = () => {
  const { posts } = usePost();
  return (
    <div class="columns is-variable is-multiline pt-5 is-1 is-mobile">
      {posts &&
        posts.map((post) => (
          <div class="column p-0 is-one-quarter  ">
            <Link to={`/posts/${post._id}`}>
              <img
                class=""
                style={{ height: "90%", width: "95%" }}
                src={post.image}
              />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default UserPost;