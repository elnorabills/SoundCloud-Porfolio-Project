import { oneSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleSong () {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(oneSongThunk(songId))
    }, [dispatch, songId])

    return (
      <div>
        <h1>{song.title}</h1>
        <h2>Song Description: {song.description}</h2>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    );
}

export default SingleSong;
