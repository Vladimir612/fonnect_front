import React, { useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import "./createGroup.css";
import { IoCloseSharp } from "react-icons/io5";

const decodeToken = (token) => {
  try {
    const decodedToken = decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const CreateGroup = ({ setCreateGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("token");

    let decodedToken;
    if (storedToken) {
      try {
        decodedToken = decodeToken(storedToken);

        const response = await axios.post(
          "http://localhost:5000/api/conversations",
          {
            username: decodedToken.username,
            name: groupName,
          }
        );

        console.log("Grupa uspešno kreirana:", response.data);
        setCreateGroup(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="create-group-form">
      <form className="flex flex-center gap-1">
        <input
          type="text"
          id="group"
          name="group"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Create</button>
      </form>
      <div
        className="close flex flex-center"
        onClick={() => setCreateGroup(false)}
      >
        <IoCloseSharp size={22} color="#004A7C" />
      </div>
    </div>
  );
};

export default CreateGroup;
