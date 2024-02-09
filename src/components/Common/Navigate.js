import React from "react";
import { useNavigate } from "react-router-dom";

const Navigate = ({ route, children, customStyle, active }) => {
  const navigate = useNavigate();

  const handleNewPage = (route) => {
    navigate(route);
  };

  return (
    <button
      onClick={() => handleNewPage(route)}
      customstyle={customStyle}
      className={active ? "active" : ""}
    >
      {children}
    </button>
  );
};

export default Navigate;
