import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./login.css";

import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [inputUser, setInputUser] = useState({ username: "", password: "" });
  const { isLoading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await fetch(`http://localhost:5000/auth${path}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputUser),
      });
      const body = await response.json();

      if (response.status !== 200) {
        dispatch({ type: "LOGIN_FAIL", payload: { message: body.message } });
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: body.details,
          payload2: body.token,
        });
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: { message: err.message } });
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginTitle">{path === "/login" ? "Login" : "Sign Up"}</h1>
      <form
        className="loginForm"
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "200px" }}
      >
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
          value={inputUser.username}
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={inputUser.password}
          onChange={(e) => handleChange(e)}
          required
        />
        <button disabled={isLoading}>
          {path === "/login" ? "Login" : "Create Account"}
        </button>
        {error && <p style={{ textAlign: "center" }}>{error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
