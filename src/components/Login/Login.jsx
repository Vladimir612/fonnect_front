import React, { useState } from "react";
import Navigate from "../Common/Navigate";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import useStore from "../../store";

const Login = () => {
  const [username, setUsername] = useState("pera");
  const [password, setPassword] = useState("pera");
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);

  const { setUser } = useStore();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          username,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      setUser({ username: username });

      navigate("/messanger");
    } catch (error) {
      console.error("Error:", error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <>
      {errorMsg !== null && (
        <ErrorMessage errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      )}
      <div className="auth-form login">
        <div className="row flex flex-around auth-navigate">
          <Navigate route={"/login"} active={true}>
            Login
          </Navigate>
          <Navigate route={"/register"} active={false}>
            Register
          </Navigate>
        </div>
        <div className="column flex">
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={username}
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="submit-auth-form"
              type="button"
              onClick={(e) => submitForm(e)}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
