import "./UserPage.css"
import { useSelector } from "react-redux";

function UserHomePage () {
  const sessionUser = useSelector((state) => state.session.user);

    return (
      <div className="user-home-page-container">
        <div className="names-container">
          <h1 className="h1-user-home-page-title">Welcome Back </h1>
          <h2 className="h2-user-home-page-name">{sessionUser.firstName}</h2>
        </div>
      </div>
    );
}

export default UserHomePage;
