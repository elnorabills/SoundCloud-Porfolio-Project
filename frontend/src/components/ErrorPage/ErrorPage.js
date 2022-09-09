import { NavLink } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
  return (
      <div className="error-page-container">
        <h1 className="h1-error-page-title">404: Page Not Found</h1>
        <h2 className="h2-error-page-description">
          {" "}
          Click here to go back{" "}
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </h2>
      </div>
  );
}

export default ErrorPage;
