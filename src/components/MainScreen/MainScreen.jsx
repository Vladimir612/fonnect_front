import React from "react";
import Navigate from "../Common/Navigate";

const MainScreen = () => {
  return (
    <div className="main-screen flex flex-center gap-1">
      <Navigate
        route={"/login"}
        active={false}
        customStyle={{
          background: "#004A7C",
          color: "#fff",
          boxShadow: "2px 2px 5px #cecece",
          borderRadius: "1rem",
          width: "12rem",
          padding: "0.6rem 1rem",
        }}
      >
        Login
      </Navigate>
      <Navigate
        route={"/register"}
        active={false}
        customStyle={{
          background: "#11C098",
          color: "#fff",
          boxShadow: "2px 2px 5px #cecece",
          borderRadius: "1rem",
          width: "12rem",
          padding: "0.6rem 1rem",
        }}
      >
        Register
      </Navigate>
      <Navigate
        route={"/messanger"}
        active={false}
        customStyle={{
          background: "#8781BD",
          color: "#fff",
          boxShadow: "2px 2px 5px #cecece",
          borderRadius: "1rem",
          width: "12rem",
          padding: "0.6rem 1rem",
        }}
      >
        Chat
      </Navigate>
    </div>
  );
};

export default MainScreen;
