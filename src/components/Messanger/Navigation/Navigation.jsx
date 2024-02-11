import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import useStore from "../../../store";
import { jwtDecode as decode } from "jwt-decode";
import axios from "axios";
import "./navigation.css";
import Contact from "./Contact/Contact";
import Group from "./Group/Group";
import CreateGroup from "./CreateGroup/CreateGroup";

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
  const { users, setUser, setUsers, setMessages, messages } = useStore();
  const socketRef = useRef();
  const [tab, setTab] = useState(0);

  const [newUser, setNewUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);

  const [newGroup, setNewGroup] = useState(null);
  const [groups, setGroups] = useState(null);

  const [newMessage, setNewMessage] = useState(null);

  const [createGroup, setCreateGroup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem("token");

      let decodedToken;
      if (storedToken) {
        try {
          decodedToken = decodeToken(storedToken);
          if (tab === 0) {
            if (activeUsers !== null) {
              const updatedUsers = activeUsers.map((activeUsername) => {
                return {
                  username: activeUsername,
                  active: true,
                };
              });

              const response = await axios.get(
                "http://localhost:5000/api/users"
              );
              const response2 = await axios.get(
                `http://localhost:5000/api/conversations/private-convos?username=${decodedToken.username}`
              );

              const users = response.data;
              const conversations = response2.data;

              const conversationsMap = conversations.reduce(
                (acc, conversation) => {
                  const [participant] = conversation.participants;
                  acc[participant?.username || decodedToken.username] =
                    conversation._id;
                  return acc;
                },
                {}
              );

              const usersWithActiveStatus = users.map((user) => {
                const updatedUser = updatedUsers.find(
                  (updatedUser) => updatedUser?.username === user.username
                );

                return {
                  ...user,
                  chatId: conversationsMap[user.username] || null,
                  active: updatedUser ? updatedUser.active : false,
                };
              });

              setUsers(usersWithActiveStatus);
            }
          } else {
            const response = await axios.get(
              "http://localhost:5000/api/conversations/groups"
            );

            setGroups(response.data);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, activeUsers]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    let decodedToken;

    if (storedToken) {
      try {
        decodedToken = decodeToken(storedToken);
        setUser({ username: decodedToken.username });

        socketRef.current = io(ENDPOINT, {
          query: { username: decodedToken.username },
        });

        socketRef.current.on("newMessage", (data) => {
          setNewMessage(data);
        });

        socketRef.current.on("activeUsers", (userData) => {
          setActiveUsers(userData.activeUsers);
        });

        socketRef.current.on("userRegistered", (userData) => {
          setNewUser(userData);
        });

        socketRef.current.on("groupAdded", (groupData) => {
          setNewGroup(groupData);
        });

        socketRef.current.on("disconnect", () => {
          console.log("Disconnected from the server");
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        return;
      }
    }

    return () => {
      // Cleanup kod unmounta
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      setMessages(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newUser !== null) {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
    }
    // eslint-disable-next-line
  }, [newUser, setNewUser]);

  useEffect(() => {
    if (newGroup !== null) {
      if (!groups) {
        setGroups([newGroup]);
      } else {
        setGroups((prevGroups) => [...prevGroups, newGroup]);
      }
    }
    // eslint-disable-next-line
  }, [newGroup, setNewGroup]);

  useEffect(() => {
    if (newMessage !== null) {
      if (newMessage.type !== "groupchat") {
        if (activeChat?.username === newMessage.message.sender.username) {
          if (!messages) {
            setMessages([newMessage.message]);
          } else {
            setMessages([...messages, newMessage.message]);
          }
        } else {
          const userToUpdate = users.find(
            (user) => user.username === newMessage.message.sender.username
          );

          if (userToUpdate && userToUpdate.chatId === null) {
            const updatedUsers = users.map((user) =>
              user.username === newMessage.message.sender.username
                ? { ...user, chatId: newMessage.conversationId }
                : user
            );

            setUsers(updatedUsers);
          }
        }
      } else {
        if (
          activeChat?.name !== "" &&
          activeChat._id === newMessage.conversationId
        ) {
          if (!messages) {
            setMessages([newMessage.message]);
          } else {
            setMessages([...messages, newMessage.message]);
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [newMessage, setNewMessage]);

  return (
    <>
      {createGroup && <CreateGroup setCreateGroup={setCreateGroup} />}
      <div className="navigation">
        {tab === 0 ? (
          users.map((u, index) => (
            <Contact
              u={u}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              key={index}
            />
          ))
        ) : (
          <>
            <button
              className="create-group flex flex-center"
              onClick={() => setCreateGroup(true)}
            >
              Create group
            </button>
            {groups?.map((g, index) => (
              <Group
                group={g}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                key={index}
              />
            ))}
          </>
        )}
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
    </>
  );
};

export default Navigation;
