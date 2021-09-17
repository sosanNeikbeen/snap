import React from "react";

const PostComment = () => {
  return (
    <div>
      <div class="tabs pt-5">
        <ul>
          <li class="is-active">
            <a>Comments</a>
          </li>
        </ul>
      </div>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/48x48.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Barbara Middleton</strong>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              porta eros lacus, sit amet dolor blandit rutrum. Nunc in tempus
              turpis.
              <br />
            </p>
          </div>
        </div>
      </article>

      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/48x48.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea
                class="textarea"
                placeholder="Add a comment..."
              ></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button has-background-info">Post comment</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostComment;
