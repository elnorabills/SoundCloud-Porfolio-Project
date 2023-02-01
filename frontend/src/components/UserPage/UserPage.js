import "./UserPage.css"
import { useSelector } from "react-redux";

function UserHomePage () {
  const sessionUser = useSelector((state) => state.session.user);

      return (
        <div className="home-page-container-up">
          <div className="left-group-up">
            <i className="fa-solid fa-music" id="b-note-one-up"></i>
            <i className="fa-solid fa-cloud" id="b-one-up"></i>
          </div>
          <div className="title-cloud-up">
            <i className="fa-solid fa-cloud" id="big-cloud-up-aqua"></i>
            <i className="fa-solid fa-cloud" id="big-cloud-up-blueviolet"></i>
            <i className="fa-solid fa-cloud" id="big-cloud-up"></i>
            <span className="title-note-container-up">
              <i className="fa-solid fa-music" id="title-note-up"></i>
            </span>
            <span className="title-cloud-text-up">
              Welcome back {sessionUser.firstName}!
            </span>
            <span className="title-cloud-para-up">
              Be an artist. Upload tracks and share them with your social
              networks. Browse through songs and albums, distribute music, demos
              and beats.
            </span>
            <span className="title-note-container-bottom-up">
              <i className="fa-solid fa-music" id="title-note-two-up"></i>
            </span>
          </div>
          <div className="right-group-up">
            <i className="fa-solid fa-music" id="b-note-two-up"></i>
            <i className="fa-solid fa-cloud" id="b-two-up"></i>
          </div>
        </div>
      );
}

export default UserHomePage;
