import React from "react";
import "./header.css";
import useStore from "../../../store";
import { useNavigate } from "react-router-dom";

const Header = ({ activeChat }) => {
  const navigate = useNavigate();
  let initials = "";
  const words = activeChat?.fullname?.split(" ");

  const { user } = useStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (words?.length >= 2) {
    initials = `${words[0].charAt(0).toUpperCase()}${words[1]
      .charAt(0)
      .toUpperCase()}`;
  } else if (words?.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  }

  return (
    <div className="header flex flex-center">
      {activeChat && activeChat.fullname ? (
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
      ) : activeChat && activeChat._id ? (
        <div className="contact flex flex-center">
          <div className="fullname">{activeChat.name}</div>
        </div>
      ) : (
        "Select a contact or a group"
      )}
      <button
        type="button"
        className="logout-btn flex flex-center"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Header;
