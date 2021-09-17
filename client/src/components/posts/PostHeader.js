import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const PostHeader = () => {
  return (
    <article class="media is-mobile ">
      <figure class="media-left">
        <p class="image is-32x32">
          <img src="https://bulma.io/images/placeholders/32x32.png" />
        </p>
      </figure>
      <div class="media-content is-mobile">
        <div class="content">
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small>{" "}
            <small>31m</small>
            <br />
          </p>
        </div>
      </div>
      <div class="media-right">
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </article>
  );
};

export default PostHeader;
