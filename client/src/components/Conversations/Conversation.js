import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const { fetchUser } = useAuth();

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);
    const getUser = async () => {
      const data = await fetchUser(friendId);
      setUser(data);
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <aside class="menu">
      {user !== null ? (
        <ul class="menu-list m-0">
          <li>
            <Link to={`/message/${conversation._id}`}>
              <nav class="level is-mobile pt-2">
                <div class="level-left">
                  <div class="level-item">
                    <figure className="">
                      <figure className="image ">
                        <img
                          className="pic-rounded"
                          src={
                            user.picture != null
                              ? user.picture
                              : "https://bulma.io/images/placeholders/256x256.png"
                          }
                          alt=""
                        />
                      </figure>
                    </figure>
                  </div>
                  <div class="level-item">
                    <div className="content">
                      <p className="title is-6">{user.name}</p>
                      <p class="subtitle has-text-grey pt-5 is-6">
                        See Message
                      </p>
                    </div>
                  </div>
                </div>
              </nav>
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </aside>
  );
};

export default Conversation;
