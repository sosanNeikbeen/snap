import React, { useEffect, useState, FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ConversationData, User } from "../../interfaces/index";

interface Props {
  conversation: ConversationData;
  currentUser: User;
}

const Conversation: FC<Props> = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  // const [currentChat, setCurrentChat] = useState(conversation);
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
    <aside className="menu">
      {user !== null ? (
        <ul className="menu-list m-0">
          <li>
            <Link to={`/message/${conversation._id}`}>
              <nav className="level is-mobile pt-2">
                <div className="level-left">
                  <div className="level-item">
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
                  <div className="level-item">
                    <div className="content">
                      <p className="title is-6">{user.name}</p>
                      <p className="subtitle has-text-grey pt-5 is-6">
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
