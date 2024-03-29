import "./Home.css";
import { NavLink } from "react-router-dom";

function HomePage () {
  return (
    <div className="home-page-container">
      <div className="left-group">
        <i className="fa-solid fa-music" id="b-note-one"></i>
        <i className="fa-solid fa-cloud" id="b-one"></i>
      </div>
      <div className="title-cloud">
        <i className="fa-solid fa-cloud" id="big-cloud"></i>
        <span className="title-note-container">
          <i className="fa-solid fa-music" id="title-note"></i>
        </span>
        <span className="title-cloud-text">
          What's next in music is first on SoundCloud
        </span>
        <span className="title-cloud-para">
          Upload your first track and begin your journey. SoundCloud gives you
          space to create, find your fans, and connect with other artists.
        </span>
        <span className="title-note-container-bottom">
          <i className="fa-solid fa-music" id="title-note-two"></i>
        </span>
        <span className="title-cloud-link">
          <NavLink className="nav-link-title-cloud" to="/sign-up">
            Sign Up
          </NavLink>
        </span>
      </div>
      <div className="right-group">
        <i className="fa-solid fa-music" id="b-note-two"></i>
        <i className="fa-solid fa-cloud" id="b-two"></i>
      </div>
    </div>
  );
}

export default HomePage;
