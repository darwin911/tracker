import React from "react";

const LoginForm = props => {
  const { handleChange, handleLogin } = props
  return (
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
        name="password"
        required />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
