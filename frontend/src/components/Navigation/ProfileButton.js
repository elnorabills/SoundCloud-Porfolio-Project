import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser()).then(() => <Redirect to="/" />);
  };

  return (
    <>
      <button className="prof-button-user" onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Email: {user.email}</li>
          <li>
            <NavLink className="nav-link" to="/me/songs">
              My Songs
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/me/albums">
              My Albums
            </NavLink>
          </li>
          <li>
            <button className="prof-button-logout" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
