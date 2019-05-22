import React from "react";
import { Link } from "react-router-dom";

const LoginForm = props => {
  const { handleChange, handleLogin } = props;
  return (
    <>
      <form onSubmit={handleLogin} className="form">
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="user@email.com"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <button>Login</button>
      </form>
      <p>
        If you don't have an account, please{" "}
        <Link to="/register">Register</Link>
      </p>
    </>
  );
};

export default LoginForm;
