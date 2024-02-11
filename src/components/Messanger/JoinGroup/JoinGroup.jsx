import React from "react";
import axios from "axios";
import "./joinGroup.css";
import { IoCloseSharp } from "react-icons/io5";
import useStore from "../../../store";

const JoinGroup = ({ setJoinGroup, joinGroup }) => {
  const setMessages = useStore((state) => state.setMessages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/conversations/${joinGroup.chatId}/join`,
        {
          username: joinGroup.username,
        }
      );

      setMessages(response.data.messages);
      setJoinGroup(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="join-group-form">
      <button onClick={(e) => handleSubmit(e)}>JOIN</button>
      <div
        className="close flex flex-center"
        onClick={() => setJoinGroup(null)}
      >
        <IoCloseSharp size={22} color="#004A7C" />
      </div>
    </div>
  );
};

export default JoinGroup;
