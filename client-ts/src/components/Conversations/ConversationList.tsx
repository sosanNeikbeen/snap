import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Conversation from "./Conversation";

const Conversations: FC = () => {
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${currentUser.userId}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser.userId]);

  return (
    <>
      {conversations.map((c, i) => (
        <React.Fragment key={i}>
          <Conversation conversation={c} currentUser={currentUser} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Conversations;
