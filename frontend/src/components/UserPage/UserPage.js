import "./UserPage.css"
import { useSelector } from "react-redux";

function UserHomePage () {
  const sessionUser = useSelector((state) => state.session.user);

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
              Welcome back, {sessionUser.firstName}
            </span>
            <span className="title-cloud-para">
              Be an artist. Upload tracks and share them with your social
              networks. Browse through songs and albums, distribute music, demos
              and beats.
            </span>
            <span className="title-note-container-bottom">
              <i className="fa-solid fa-music" id="title-note-two"></i>
            </span>
          </div>
          <div className="right-group">
            <i className="fa-solid fa-music" id="b-note-two"></i>
            <i className="fa-solid fa-cloud" id="b-two"></i>
          </div>
        </div>
      );
}

export default UserHomePage;
