import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const demoUsername = "RockMan3";
  const demoPassword = "password4";

  const demoUserLogin = () => {
    setCredential(demoUsername);
    setPassword(demoPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.sessionLogin({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <h1 className="h1-login">Login</h1>
        </div>
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="flex-input">
          <label>
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex-input">
          <label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button className="login-button" type="submit">
            LOG IN
          </button>
        </div>
        <div>
          <button className="Demo-Login-button" onClick={demoUserLogin}>
            DEMO USER
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
