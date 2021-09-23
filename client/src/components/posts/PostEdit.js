import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { usePost } from "../../context/PostContext";

const PostEdit = () => {
  const [post, setPost] = useState();
  const { editPost, fetchPost } = usePost();
  const postRef = useRef();
  const history = useHistory();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(id);
      setPost(data.post);
    };

    getPost();
  }, []);

  const onInputChange = () => {
    setPost(postRef.current.value);
  };

  const onSubmit = () => {
    const data = {
      post: post,
    };
    try {
      editPost(id, data);
      history.push("/");
    } catch (error) {
      debugger;
    }
  };

  return (
    <div>
      <h3>Edit Stream</h3>
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <textarea
            class="textarea is-info"
            ref={postRef}
            placeholder="Write caption"
            onChange={onInputChange}
            value={post}
            name="post"
          ></textarea>
        </div>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostEdit;
