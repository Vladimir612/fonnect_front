import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "./errorMessage.css";

const ErrorMessage = ({ errorMsg, setErrorMsg }) => {
  return (
    <div className="err-msg flex flex-around">
      <p>{errorMsg}</p>
      <IoIosCloseCircle
        size={20}
        color="#ff4646"
        onClick={() => setErrorMsg(null)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default ErrorMessage;
