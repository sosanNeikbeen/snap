import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { currentUser } = useAuth();
  const scrollRef = useRef();
  const socket = useRef();

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.userId);
    // socket.current.on("getUsers", (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: currentUser.userId,
      text: newMessage,
      conversationId: id,
    };

    let receiverId;
    messages.map((m) => {
      receiverId = m.conversationId.members.find(
        (member) => member !== currentUser.userId
      );
    });

    socket.current.emit("sendMessage", {
      senderId: currentUser.userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop pb-6 p-2">
                {messages.map((m) => (
                  <div key={m._id} ref={scrollRef}>
                    <Message
                      message={m}
                      own={m.sender._id === currentUser.userId}
                      user={currentUser}
                    />
                  </div>
                ))}

                <nav
                  className="navbar  is-mobile is-fixed-bottom"
                  role="navigation"
                  aria-label="main navigation"
                >
                  <div className=" p-0">
                    <div className="field  has-addons">
                      <div className="control is-expanded ">
                        <input
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                          className="input  is-fullwidth"
                          type="text"
                          placeholder="Find a repository"
                        ></input>
                      </div>
                      <div className="control p-0">
                        <a onClick={handleSubmit} className="button is-info">
                          Search
                        </a>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>

              {/* <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div> */}
            </>
          </div>
        </div>
        {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div> */}
      </div>
    </>
  );
};

export default Messenger;
