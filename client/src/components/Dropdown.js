import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ children }) => {
  const [isActive, setisActive] = useState(false);
  return (
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
      {children}
    </div>
  );
};

export default Dropdown;
