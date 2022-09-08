import { meSongsThunk } from "../../store/me";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./UserSongs.css";

function UserSongs() {
  const dispatch = useDispatch();
  const meSongs = useSelector((state) => state.me);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(meSongsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="all-user-songs-large-container">
      <h1 className="h1-all-user-songs-title">My Songs</h1>
      <div className="all-user-songs-container">
        {Object.keys(meSongs).map((songId) => {
          return (
            <Link className="nav-link" key={songId} to={`/songs/${songId}`}>
              <div className="all-user-songs" id={songId}>
                {meSongs[songId].title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default UserSongs;
