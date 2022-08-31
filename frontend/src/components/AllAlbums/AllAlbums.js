import { allAlbumsThunk } from "../../store/albums";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function AllAlbums() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(allAlbumsThunk());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Object.keys(albums).map((albumId) => {
        return (
          <Link key={albumId} to={`/albums/${albumId}`}>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid black",
              }}
            >
              {albums[albumId].title}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default AllAlbums;
