import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
    dispatch(sessionActions.logoutUser());
    <Redirect to="/" />
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div>{user.email}</div>
          <div>
            <NavLink to="/me/songs">My Songs</NavLink>
          </div>
          <div>
            <NavLink to="/me/albums">My Albums</NavLink>
          </div>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
