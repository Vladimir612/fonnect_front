import { useEffect, useRef } from "react";
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
            const activeUsers = userData.activeUsers;

            if (response.data.length > 0) {
              const updatedUsers = response.data.map((user) => {
                if (activeUsers.includes(user.username)) {
                  return { ...user, active: true };
                } else {
                  return { ...user, active: false };
                }
              });

              setUsers(updatedUsers);
            }
          });

          socketRef.current.on("userConnected", (userData) => {
            console.log(`User connected: ${userData.username}`);
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
    console.log(users);
  }, [users]);

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
    </div>
  );
};

export default Navigation;
