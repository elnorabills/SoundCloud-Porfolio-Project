import { meAlbumsThunk } from "../../store/me";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

function UserAlbums() {
  const dispatch = useDispatch();
  const meAlbums = useSelector((state) => state.me);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(meAlbumsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Object.keys(meAlbums).map((albumId) => {
        return (
          <Link key={albumId} to={`/albums/${albumId}`}>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid black",
              }}
            >
              {meAlbums[albumId].title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default UserAlbums;
