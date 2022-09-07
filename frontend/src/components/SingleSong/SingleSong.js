import { oneSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { deleteSongThunk } from "../../store/songs";
import { meSongsThunk } from "../../store/me";
import EditSongButtonComp from "../EditSongForm/EditSongButton";

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

    if (!song) return <Redirect to="/me/songs" />;

    let sessionUserActions;

    if (sessionUser.id === song.userId) {
      sessionUserActions = (
        <div className="delete-song-button-container">
          <button className="delete-song-button" onClick={handleSubmit}>
            Delete
          </button>
          <div className="edit-song-button">
            <EditSongButtonComp />
          </div>
        </div>
      );
    }

    let existingSong;
    if (song) {
      existingSong = (
        <div>
          <h1>{song.title}</h1>
          <h2>{song.description}</h2>
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
