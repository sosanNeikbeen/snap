import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import UserPost from "./posts/UserPost";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState();
  const { fetchUser, currentUser } = useAuth();
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser(id);
      setUser(data);
    };

    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderButton = () => {
    if (id === currentUser.userId) {
      return (
        <Link to={`/users/edit/${id}`} className="button is-fullwidth ">
          Edit profile
        </Link>
      );
    } else {
      return <button className="button is-fullwidth ">Send Message</button>;
    }
  };

  const { name, location, picture } = user;

  return (
    <div>
      <div className="image-container  ">
        <img
          className="profile-rounded"
          width="400px"
          height="100"
          src={
            picture
              ? picture
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          alt=""
        />
      </div>

      <div className="pl-5">
        <p className=" has-text-weight-bold title is-size-4">{name}</p>
        <p className="has-text-grey subtitle is-size-6 ">
          <i className="fas fa-angle-down" aria-hidden="true">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </i>{" "}
          {location}
        </p>
      </div>
      <div className="p-4">
        {renderButton()}
        <UserPost />
      </div>
    </div>
  );
};

export default Profile;
