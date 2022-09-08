import { meAlbumsThunk } from "../../store/me";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import CreateAlbumButtonComp from "../CreateAlbumForm/CreateAlbumButton";
import "./UserAlbums.css";

function UserAlbums() {
  const dispatch = useDispatch();
  const meAlbums = useSelector((state) => state.me);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(meAlbumsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

   const sessionUserActions = (
      <div className="create-album-button-container">
        <div className="create-album-button-comp">
          <CreateAlbumButtonComp />
        </div>
      </div>
    );

  return (
    <div className="all-user-albums-large-container">
      <h1 className="h1-all-user-albums-title">My Albums</h1>
      <div className="session-user-actions">{sessionUserActions}</div>
      <div className="all-user-albums-container">
        {Object.keys(meAlbums).map((albumId) => {
          return (
            <Link className="nav-link" key={albumId} to={`/albums/${albumId}`}>
              <div className="all-user-albums" id={albumId}>
                {meAlbums[albumId].title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default UserAlbums;
