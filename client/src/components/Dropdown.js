import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ children }) => {
  const [isActive, setisActive] = useState(false);
  return (
    <div className={`dropdown is-right ${isActive ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <span
          className="icon is-small"
          aria-haspopup="true"
          aria-controls="dropdown-menu3"
          onClick={() => {
            setisActive(!isActive);
          }}
        >
          <i className="fas fa-angle-down" aria-hidden="true">
            <FontAwesomeIcon icon={faEllipsisH} />
          </i>
        </span>
      </div>
      {children}
    </div>
  );
};

export default Dropdown;
