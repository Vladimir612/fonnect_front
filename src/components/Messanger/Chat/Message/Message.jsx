import React from "react";
import "./message.css";
import useStore from "../../../../store";

const Message = ({ sender, message }) => {
  let initials = "";

  const words = sender?.fullname?.split(" ");

  const { user } = useStore();

  if (words?.length >= 2) {
    initials = `${words[0].charAt(0).toUpperCase()}${words[1]
      .charAt(0)
      .toUpperCase()}`;
  } else if (words?.length === 1) {
    initials = words[0].charAt(0).toUpperCase();
  }

  return (
    <div
      className={`message flex flex-between gap-1 ${
        user.username === sender.username && "from-me"
      }`}
    >
      <div
        className="initials flex flex-center"
        style={{ background: sender.color }}
      >
        {initials}
      </div>
      <p className="text">{message.content}</p>
    </div>
  );
};

export default Message;
