import { allAlbumsThunk } from "../../store/albums";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AllAlbums.css";
import { Link } from "react-router-dom";

function AllAlbums() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(allAlbumsThunk());
  }, [dispatch]);

  return (
    <div className="all-albums-large-container">
      <h1 className="h1-all-albums-title">Albums</h1>
      <div className="all-albums-container">
        {Object.keys(albums).map((albumId) => {
          return (
          <Link className="nav-link" key={albumId} to={`/albums/${albumId}`}>
            <div className="all-albums" id={albumId}>
            {albums[albumId].title}
            </div>
          </Link>
          )
        })}
      </div>
    </div>
  );
}

export default AllAlbums;
