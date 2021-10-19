import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Conversation from "./Conversation";

const Conversations = () => {
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
      {conversations.map((c) => (
        <Conversation conversation={c} currentUser={currentUser} />
      ))}
    </>
  );
};

export default Conversations;
