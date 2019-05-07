import React from "react";

const RegisterForm = props => {
  const { handleChange, handleRegister } = props
  return (
    <form onSubmit={handleRegister}>
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
        required />
      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
