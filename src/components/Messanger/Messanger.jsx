import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import "./messanger.css";
import Header from "./Header/Header";
import Chat from "./Chat/Chat";

const Messanger = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="messanger">
      <Header activeChat={activeChat} />
      <div>
        <Navigation activeChat={activeChat} setActiveChat={setActiveChat} />
        {activeChat && (
          <Chat
            activeChat={activeChat}
            messages={[
              {
                user: {
                  active: true,
                  color: "#F3716D",
                  fullname: "Pera Perić",
                  username: "pera",
                },
                message: { date: "9.2.2024", text: "Poruka 1" },
              },
              {
                user: {
                  active: false,
                  color: "#FFCD67",
                  fullname: "Mika Mikić",
                  username: "mika",
                },
                message: { date: "9.2.2024", text: "Poruka 2" },
              },
              {
                user: {
                  active: true,
                  color: "#F3716D",
                  fullname: "Pera Perić",
                  username: "pera",
                },
                message: { date: "9.2.2024", text: "Poruka 1" },
              },
              {
                user: {
                  active: false,
                  color: "#FFCD67",
                  fullname: "Mika Mikić",
                  username: "mika",
                },
                message: {
                  date: "9.2.2024",
                  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam repellendus laboriosam ducimus unde, alias consequuntur. Numquam optio fugiat dolore.",
                },
              },
              {
                user: {
                  active: true,
                  color: "#F3716D",
                  fullname: "Pera Perić",
                  username: "pera",
                },
                message: { date: "9.2.2024", text: "Poruka 1" },
              },
              {
                user: {
                  active: false,
                  color: "#FFCD67",
                  fullname: "Mika Mikić",
                  username: "mika",
                },
                message: {
                  date: "9.2.2024",
                  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam repellendus laboriosam ducimus unde, alias consequuntur. Numquam optio fugiat dolore.",
                },
              },
              {
                user: {
                  active: true,
                  color: "#F3716D",
                  fullname: "Pera Perić",
                  username: "pera",
                },
                message: {
                  date: "9.2.2024",
                  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam repellendus laboriosam ducimus unde, alias consequuntur. Numquam optio fugiat dolore.",
                },
              },
              {
                user: {
                  active: false,
                  color: "#FFCD67",
                  fullname: "Mika Mikić",
                  username: "mika",
                },
                message: { date: "9.2.2024", text: "Poruka 2" },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Messanger;
