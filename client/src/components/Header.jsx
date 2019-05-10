import React from "react";
import RegisterForm from "./RegisterForm.jsx";
import LoginForm from "./LoginForm.jsx";
import { Link, Route } from "react-router-dom";

const Header = props => {
  const {
    isLoggedIn,
    handleChange,
    handleLogin,
    handleRegister,
    handleLogout,
    currentUser
  } = props;
  return (
    <header>
      <h1 className="logo">Tracker</h1>
      {isLoggedIn ? <p>Welcome {currentUser.name}</p> : null}
      <nav className="nav-header">
        {isLoggedIn ? (
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Route
          path="/login"
          render={props => (
            <LoginForm handleChange={handleChange} handleLogin={handleLogin} />
          )}
        />

        <Route
          path="/register"
          render={props => (
            <RegisterForm
              handleChange={handleChange}
              handleRegister={handleRegister}
            />
          )}
        />
      </nav>
     
    </header>
  );
};

export default Header;
