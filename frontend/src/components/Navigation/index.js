import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import soundcloudLogo from "../../images/wsound.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink className="nav-link" to="/login">
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/sign-up">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="nav-bar-comp">
      <header>
        <img src={soundcloudLogo} alt="soundCloud logo" />
        <nav className="nav-ele">
          <ul>
            <li>
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/songs">
                Songs
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/albums">
                Albums
              </NavLink>
            </li>
            <li>
              <a
                className="nav-link"
                href="https://github.com/elnorabills/SoundCloud-Porfolio-Project"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                href="https://github.com/elnorabills/SoundCloud-Porfolio-Project"
              >
                LinkedIn
              </a>
            </li>
            {isLoaded && sessionLinks}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navigation;
