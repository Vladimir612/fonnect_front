import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./chat.css";
import Message from "./Message/Message";
import useStore from "../../../store";
import axios from "axios";

const Chat = ({ activeChat }) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef();

  const { messages, setMessages, user, users, setUsers } = useStore();

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message !== "") {
      if (activeChat.username) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/conversations/messages",
            {
              content: message,
              senderUsername: user.username,
              receiverUsername: activeChat.username,
            }
          );

          const userToUpdate = users.find(
            (user) => user.username === activeChat.username
          );

          if (userToUpdate && userToUpdate.chatId === null) {
            const updatedUsers = users.map((user) =>
              user.username === activeChat.username
                ? { ...user, chatId: response.data._id }
                : user
            );

            setUsers(updatedUsers);
          }

          if (!messages) {
            setMessages([
              response.data.messages[response.data.messages.length - 1],
            ]);
          } else {
            setMessages([
              ...messages,
              response.data.messages[response.data.messages.length - 1],
            ]);
          }
          setMessage("");
        } catch (error) {
          console.error("Error submitting message:", error);
        }
      } else if (activeChat.name !== "") {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/conversations/messages",
            {
              content: message,
              senderUsername: user.username,
              conversationId: activeChat._id,
            }
          );

          if (!messages) {
            setMessages([
              response.data.messages[response.data.messages.length - 1],
            ]);
          } else {
            setMessages([
              ...messages,
              response.data.messages[response.data.messages.length - 1],
            ]);
          }
          setMessage("");
        } catch (error) {
          console.error("Error submitting message:", error);
        }
      }
    }
  };

  return (
    <div className="chat flex">
      <div className="messages" ref={messagesRef}>
        {messages?.map((m, index) => (
          <Message message={m} sender={m.sender} key={index} />
        ))}
      </div>
      <form className="send-msg flex flex-between">
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="send-msg-btn flex flex-center"
          onClick={(e) => handleSubmit(e)}
        >
          <IoIosSend size={25} color="#fff" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
