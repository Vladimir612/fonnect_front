import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import useStore from "../../../store";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import "./navigation.css";
import Contact from "./Contact/Contact";

const decodeToken = (token) => {
  try {
    const decodedToken = decode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const ENDPOINT = "http://localhost:5000";

const Navigation = ({ activeChat, setActiveChat }) => {
  const { users, setUser, setUsers } = useStore();
  const socketRef = useRef();
  const [tab, setTab] = useState(0);

  const [newUser, setNewUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");

      let decodedToken;

      if (storedToken) {
        try {
          decodedToken = decodeToken(storedToken);
          setUser({ username: decodedToken.username });

          const response = await axios.get("http://localhost:5000/api/users");
          setUsers(response.data);

          socketRef.current = io(ENDPOINT, {
            query: { username: decodedToken.username },
          });

          socketRef.current.on("activeUsers", (userData) => {
            setActiveUsers(userData.activeUsers);
          });

          socketRef.current.on("userRegistered", (userData) => {
            setNewUser(userData);
          });

          socketRef.current.on("disconnect", () => {
            console.log("Disconnected from the server");
          });
        } catch (error) {
          console.error("Error decoding token:", error);
          return;
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newUser !== null) {
      const updatedUsers = [...users, newUser];
      console.log(updatedUsers);
      setUsers(updatedUsers);
    }
    // eslint-disable-next-line
  }, [newUser, setNewUser]);

  useEffect(() => {
    if (users.length > 0 && activeUsers !== null) {
      const updatedUsers = users.map((user) => {
        if (activeUsers.includes(user.username)) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });

      setUsers(updatedUsers);
    }
    // eslint-disable-next-line
  }, [activeUsers, setActiveUsers]);

  return (
    <div className="navigation">
      {users.map((u, index) => (
        <Contact
          u={u}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          key={index}
        />
      ))}
      <div className="tabs flex flex-center">
        <div
          className={`tab flex flex-center ${tab === 0 && "active"}`}
          onClick={() => setTab(0)}
        >
          Users
        </div>
        <div
          className={`tab flex flex-center ${tab === 1 && "active"}`}
          onClick={() => setTab(1)}
        >
          Groups
        </div>
      </div>
    </div>
  );
};

export default Navigation;
