import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const {
    isLoggedIn,
    handleLogout,
    currentUser
  } = props;
  return (
    <header>
      <h1 className="logo">Tracker</h1>
      {isLoggedIn ? <p>Welcome {currentUser.name.split(' ')[0]}</p> : null}
      <nav className="nav-header">
        {isLoggedIn ? (
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        ) : (
          <>
            <p></p>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
