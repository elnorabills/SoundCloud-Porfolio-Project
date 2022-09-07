import { allSongsThunk } from "../../store/songs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AllSongs.css";

function AllSongs() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);

    useEffect(() => {
        dispatch(allSongsThunk())
    }, [dispatch])

    return (
      <div className="all-songs-large-container">
        <h1 className="h1-all-songs-title">Songs</h1>
        <div className="all-songs-container">
          {Object.keys(songs).map((songId) => {
            return (
              <div className="all-songs" id={songId}>
                {songs[songId].title}
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default AllSongs;
