import React, { useEffect, useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import Navigation from "./Navigation/Navigation";
import "./messanger.css";
import Header from "./Header/Header";
import Chat from "./Chat/Chat";
import axios from "axios";
import JoinGroup from "./JoinGroup/JoinGroup";
import useStore from "../../store";

const Messanger = () => {
  const setMessages = useStore((state) => state.setMessages);

  const [activeChat, setActiveChat] = useState(null);
  const [joinGroup, setJoinGroup] = useState(null);

  const decodeToken = (token) => {
    try {
      const decodedToken = decode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    if (activeChat !== null) {
      let chatId;
      if (activeChat._id) {
        chatId = activeChat._id;
      } else if (activeChat.chatId) {
        chatId = activeChat.chatId;
      }

      if (chatId) {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          try {
            const decodedToken = decodeToken(storedToken);
            const username = decodedToken.username;

            const messagesURL = `http://localhost:5000/api/conversations/${chatId}/messages?username=${username}`;

            axios
              .get(messagesURL)
              .then((response) => {
                setMessages(response.data.messages);
              })
              .catch((error) => {
                if (error.response.status === 403) {
                  setMessages(null);
                  setJoinGroup({ username: username, chatId: chatId });
                }
              });
          } catch (err) {
            console.error(err);
          }
        }
      } else {
        setMessages(null);
      }
    } else {
      setMessages(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat]);

  return (
    <>
      {joinGroup && (
        <JoinGroup joinGroup={joinGroup} setJoinGroup={setJoinGroup} />
      )}
      <div className="messanger">
        <Header activeChat={activeChat} />
        <div>
          <Navigation activeChat={activeChat} setActiveChat={setActiveChat} />
          {activeChat && <Chat activeChat={activeChat} />}
        </div>
      </div>
    </>
  );
};

export default Messanger;
