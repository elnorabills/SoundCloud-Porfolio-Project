import { allAlbumsThunk } from "../../store/albums";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AllAlbums.css";

function AllAlbums() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(allAlbumsThunk());
  }, [dispatch]);

  return (
    <div className="all-albums-large-container">
      <h1 className="h1-all-albums-title">All Albums</h1>
      <div className="all-albums-container">
        {Object.keys(albums).map((albumId) => {
          return <div className="all-albums" key={albumId}>
            {albums[albumId].title}
            </div>;
        })}
      </div>
    </div>
  );
}

export default AllAlbums;
