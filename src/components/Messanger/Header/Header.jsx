import React from "react";
import "./header.css";
import useStore from "../../../store";

const Header = ({ activeChat }) => {
  let initials = "";
  const words = activeChat?.fullname.split(" ");

  const { user } = useStore();

  if (words?.length >= 2) {
    initials = `${words[0].charAt(0).toUpperCase()}${words[1]
      .charAt(0)
      .toUpperCase()}`;
  } else if (words?.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  }

  return (
    <div className="header flex flex-center">
      {activeChat ? (
        <div
          className={`contact flex flex-center ${
            activeChat.active ? "active-user" : ""
          }`}
        >
          <div
            className="initials flex flex-center"
            style={{ background: activeChat.color }}
          >
            {initials}
          </div>
          <div className="fullname">
            {activeChat.fullname}{" "}
            {user.username === activeChat?.username && "(Me)"}
          </div>
        </div>
      ) : (
        "Select a contact which you would like to send a message"
      )}
    </div>
  );
};

export default Header;
