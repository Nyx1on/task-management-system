import React from "react";
import "./header.scss";

const Header = ({ user, handleLogout }) => {
  const userId = user?.uid;
  console.log(user?.displayName);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/add/:id">
                Create
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
        {userId ? (
          <>
            <div className="profile-logo">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="logo"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <p style={{ marginTop: "15px", marginLeft: "10px" }}>
              {user?.displayName}
            </p>
            <li className="nav-item nav-link">
              <a className="nav-link" href="/auth" onClick={handleLogout} id="log">
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <div id="login">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/auth" id="log">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Header;
