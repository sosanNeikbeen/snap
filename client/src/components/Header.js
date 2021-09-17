import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  const [isActive, setisActive] = useState(false);
  return (
    <div className="box has-background-primary p-2">
      <div className="level is-mobile  ">
        <div className="level-left">
          <div className="level-item">
            <p className="is-size-4 has-text-white has-text-weight-semibold">
              insta media
            </p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <Link to="/posts/new">
              <span class="icon is-large is-size-4 has-text-white">
                <i class="fas fa-angle-down" aria-hidden="true">
                  <FontAwesomeIcon icon={faPlus} />
                </i>
              </span>
            </Link>
          </div>
          <div className="level-item">
            <span class="icon is-large is-size-3 has-text-white">
              <i class="fas fa-angle-down" aria-hidden="true">
                <FontAwesomeIcon icon={faComments} />
              </i>
            </span>
          </div>
          <div className="level-item">
            <div class={`dropdown is-right ${isActive ? "is-active" : ""}`}>
              <div class="dropdown-trigger">
                <button
                  class="button has-background-primary "
                  aria-haspopup="true"
                  aria-controls="dropdown-menu3"
                  onClick={() => {
                    setisActive(!isActive);
                  }}
                >
                  <figure className="image is-128x128">
                    <img
                      className="image is-rounded"
                      src="https://bulma.io/images/placeholders/32x32.png"
                    />
                  </figure>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true">
                      <FontAwesomeIcon icon={faSortDown} />
                    </i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu " id="dropdown-menu3" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    Profile
                  </a>
                  <a href="#" class="dropdown-item">
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
