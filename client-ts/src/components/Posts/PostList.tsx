import React, { useEffect, useState, FC } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import Spinner from "../Spinner";
import ReactTimeAgo from "react-time-ago";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

const PostList: FC = () => {
  const { fetchPosts, posts } = usePost();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { userId } = currentUser;

  useEffect(() => {
    const fetchApiData = async () => {
      await fetchPosts();
      setLoading(false);
    };

    fetchApiData();
  }, []);

  if (loading) {
    return (
      <div className="pt-6">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <section className="section pl-4 pr-4 pt-0">
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <article className="media is-mobile pt-5">
                <figure className="media-left">
                  <figure className="image ">
                    <img
                      className="pic-rounded"
                      src={
                        post.userId.picture
                          ? post.userId.picture
                          : "https://bulma.io/images/placeholders/256x256.png"
                      }
                      alt=""
                    />
                  </figure>
                </figure>
                <div className="media-content is-mobile">
                  <div className="pt-1 content">
                    <p>
                      <strong>{post.userId.name}</strong>{" "}
                      <ReactTimeAgo date={post.createdAt} timeStyle="round" />
                      <br />
                    </p>
                  </div>
                </div>

                <div className="media-right pt-1">
                  <Dropdown>
                    <div
                      className="dropdown-menu "
                      id="dropdown-menu3"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <Link
                          className="dropdown-item"
                          to={`/users/profile/${post.userId._id}`}
                        >
                          View Profile
                        </Link>

                        {post.userId._id === userId ? (
                          <>
                            <Link
                              className="dropdown-item"
                              to={`posts/edit/${post._id}`}
                            >
                              Edit Post
                            </Link>
                            <Link
                              className="dropdown-item"
                              to={`posts/delete/${post._id}`}
                            >
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
                  {post.image ? (
                    <img src={post.image} alt="user post" />
                  ) : (
                    <div className="pt-6">
                      <Spinner />
                    </div>
                  )}
                </figure>

                <p className="pt-3">
                  {" "}
                  <strong>{post.userId.name}</strong> {post.post}
                </p>
                <Link to={`/posts/${post._id}`}>
                  <p className="has-text-grey pt-2"> View comments</p>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default PostList;
