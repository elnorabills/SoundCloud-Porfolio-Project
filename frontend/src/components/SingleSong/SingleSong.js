import { oneSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { deleteSongThunk } from "../../store/songs";
import { meSongsThunk } from "../../store/me";
import EditSongButtonComp from "../EditSongForm/EditSongButton";
import "./SingleSong.css";

function SingleSong () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const song = useSelector((state) => state.songs);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(oneSongThunk(songId))
    }, [dispatch, songId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(deleteSongThunk(songId)).then(() => dispatch(meSongsThunk()));
      history.push("/me/songs");
    };

    if (!sessionUser) return <Redirect to="/" />;

    let sessionUserActions;

    if (sessionUser.id === song.userId) {
      sessionUserActions = (
        <div className="ed-song-button-container">
          <div className="ed-delete-song-button">
            <button className="delete-song-button" onClick={handleSubmit}>
              Delete
            </button>
          </div>
            <EditSongButtonComp />
        </div>
      );
    }

    let existingSong;
    if (song) {
      existingSong = (
        <div className="single-song-container">
          <h1 className="h1-single-song-title">{song.title}</h1>
          <h2 className="h2-single-song-description">{song.description}</h2>
          <div className="small-single-song-container">
            <div className="all-user-songs" id={song.id}>
              {song.title}
            </div>
          </div>
          <div className="session-user-actions">{sessionUserActions}</div>
        </div>
      );
    }

    return (
      <div>
        {existingSong}
      </div>
    );
}

export default SingleSong;
