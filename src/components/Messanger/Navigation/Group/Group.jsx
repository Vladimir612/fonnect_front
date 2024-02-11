import React from "react";

const Group = ({ group, setActiveChat, activeChat }) => {
  return (
    <div
      className={`contact flex flex-center ${
        activeChat?._id === group._id ? "active-chat" : ""
      }`}
      onClick={() => setActiveChat(group)}
    >
      {group.name}
    </div>
  );
};

export default Group;
