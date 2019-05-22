import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = props => {
  const { handleChange, handleRegister } = props;
  return (
    <>
      <form onSubmit={handleRegister} className="form">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
          required
        />
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
          name="password"
          placeholder="password"
          required
        />
        <button>Register</button>
      </form>
      <p>
        If you already have an account, please <Link to="/login">Log In</Link>
      </p>
    </>
  );
};

export default RegisterForm;
