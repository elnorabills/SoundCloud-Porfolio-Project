import "./Home.css";
import { NavLink } from "react-router-dom";

function HomePage () {

    return (
      <div className="home-page-container">
        <div className="signup-nav-link-container">
          <NavLink className="nav-link-sign-up" to="/sign-up">
            Sign Up
          </NavLink>
        </div>
      </div>
    );
}

export default HomePage;
