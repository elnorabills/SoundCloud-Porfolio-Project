import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>404: Page Not Found</h1>
      <h2> Click here to go back {" "}
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </h2>
    </div>
  );
}

export default ErrorPage;
