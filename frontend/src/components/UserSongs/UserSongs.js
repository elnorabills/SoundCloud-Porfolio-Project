import { meSongsThunk } from "../../store/me";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function UserSongs() {
  const dispatch = useDispatch();
  const meSongs = useSelector((state) => state.me);

  useEffect(() => {
    dispatch(meSongsThunk());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Object.keys(meSongs).map((songId) => {
        return (
          <Link key={songId} to={`/songs/${songId}`}>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid black",
              }}
            >
              {meSongs[songId].title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default UserSongs;
