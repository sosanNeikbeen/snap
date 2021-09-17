import React from "react";

const PostBody = ({ posts }) => {
  // const uri = URL.createObjectURL(
  //   "blob:http://localhost:3000/c4c78bf7-6e4a-4999-909f-cc8db08c5e01"
  // );
  // console.log(uri);
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div class="container">
            <figure class="image ">
              <img src={post.image} />
            </figure>

            <p>{post.post}</p>
          </div>
        ))}
    </>
  );
};

export default PostBody;
