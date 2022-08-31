import { oneSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleSong () {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector((state) => state.songs[songId]);
    const songTitle = song.title

    useEffect(() => {
        dispatch(oneSongThunk(songId))
    }, [dispatch, songId])

    return (
      <div>
        <h1>{songTitle}</h1>
      </div>
    );
}

export default SingleSong;
