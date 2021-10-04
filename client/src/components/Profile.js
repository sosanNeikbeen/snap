import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import UserPost from "./posts/UserPost";

const Profile = () => {
  return (
    <div>
      <figure className="image ">
        <img
          className="brand-rounded"
          src="https://images.unsplash.com/photo-1524041255072-7da0525d6b34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
          alt=""
        />
      </figure>

      <div className="pl-5">
        <p className=" has-text-weight-bold title is-size-4">Angela merkel</p>
        <p className="has-text-grey subtitle is-size-6 ">
          <i className="fas fa-angle-down" aria-hidden="true">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </i>{" "}
          Berlin, Deutschland
        </p>
      </div>
      <div className="p-4">
        <button className="button is-fullwidth ">Send Message</button>
        <UserPost />
      </div>
    </div>
  );
};

export default Profile;
