import React from "react";
import "./contact.css";
import useStore from "../../../../store";

const Contact = ({ u, activeChat, setActiveChat }) => {
  let initials = "";
  const words = u.fullname.split(" ");

  const { user } = useStore();

  if (words.length >= 2) {
    initials = `${words[0].charAt(0).toUpperCase()}${words[1]
      .charAt(0)
      .toUpperCase()}`;
  } else if (words.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  }

  return (
    <div
      className={`contact flex flex-center ${
        activeChat?.username === u.username ? "active-chat" : ""
      } ${u.active ? "active-user" : ""}`}
      onClick={() => setActiveChat(u)}
    >
      <div
        className="initials flex flex-center"
        style={{ background: u.color }}
      >
        {initials}
      </div>
      <div className="fullname">
        {u.fullname} {user.username === u.username && "(Me)"}
      </div>
    </div>
  );
};

export default Contact;
