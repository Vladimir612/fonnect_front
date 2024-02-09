import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import "./messanger.css";
import Header from "./Header/Header";
import Chat from "./Chat/Chat";

const Messanger = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="messanger">
      <Header activeChat={activeChat} />
      <div>
        <Navigation activeChat={activeChat} setActiveChat={setActiveChat} />
        <Chat activeChat={activeChat} />
      </div>
    </div>
  );
};

export default Messanger;
