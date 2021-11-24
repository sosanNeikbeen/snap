import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isActive, setisActive] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { logoutUser, currentUser } = useAuth();
  const { picture, userId } = currentUser;

  const token = localStorage.getItem("token");

  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const logout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <>
      {token ? (
        <div className="box has-background-dark p-2">
          <div className="level is-mobile  ">
            <div className="level-left">
              <div className="level-item">
                {location.pathname === "/" ? (
                  <Link
                    className="is-size-4 has-text-white-bis has-text-weight-semibold"
                    to="/"
                  >
                    Snap
                  </Link>
                ) : (
                  <button className="button is-white " onClick={goBack}>
                    <span className="icon">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    <span>Go back </span>
                  </button>
                )}
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to="/posts/new">
                  <span className="icon is-large is-size-4 has-text-white">
                    <i className="fas fa-angle-down" aria-hidden="true">
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                  </span>
                </Link>
              </div>
              <div className="level-item">
                <Link to="/conversations">
                  <span className="icon is-large is-size-4 has-text-white">
                    <i className="fas fa-angle-down" aria-hidden="true">
                      <FontAwesomeIcon icon={faComments} />
                    </i>
                  </span>
                </Link>
              </div>
              <div className="level-item">
                <div
                  className={`dropdown is-right ${isActive ? "is-active" : ""}`}
                >
                  <div className="dropdown-trigger">
                    <figure
                      aria-haspopup="true"
                      aria-controls="dropdown-menu3"
                      onClick={() => {
                        setisActive(!isActive);
                      }}
                      className="image is-128x128"
                    >
                      <img
                        className="pic-rounded"
                        src={
                          picture
                            ? picture
                            : "https://bulma.io/images/placeholders/256x256.png"
                        }
                        alt=""
                      />
                    </figure>
                  </div>
                  <div
                    className="dropdown-menu "
                    id="dropdown-menu3"
                    role="menu"
                  >
                    <div className="dropdown-content">
                      {token ? (
                        <>
                          <Link
                            className="dropdown-item"
                            to={`/users/profile/${userId}`}
                          >
                            Profile
                          </Link>
                          <a className="dropdown-item" onClick={logout}>
                            Logout
                          </a>
                        </>
                      ) : (
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
