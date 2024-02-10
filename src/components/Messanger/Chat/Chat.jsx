import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./chat.css";
import Message from "./Message/Message";

const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");
  const messagesRef = useRef();

  useEffect(() => {
    // Automatski skroluj do dna kada se promeni sadržaj poruka
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat flex">
      <div className="messages" ref={messagesRef}>
        {messages.map((m, index) => (
          <Message message={m.message} sender={m.user} key={index} />
        ))}
      </div>
      <form className="send-msg flex flex-between">
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="button" className="send-msg-btn flex flex-center">
          <IoIosSend size={25} color="#fff" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
