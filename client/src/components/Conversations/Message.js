import React from "react";
import "./Message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            message.sender.picture != null
              ? message.sender.picture
              : "https://bulma.io/images/placeholders/256x256.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
