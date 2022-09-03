import { allSongsThunk } from "../../store/songs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link } from "react-router-dom";

function AllSongs() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);

    useEffect(() => {
        dispatch(allSongsThunk())
    }, [dispatch])

    return (
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}
        >
            {
                Object.keys(songs).map(songId => {
                    return (
                       // <Link key={songId} to={`/songs/${songId}`}>
                            <div key={songId}
                            style={{
                                width: '200px',
                                height: '200px',
                                border: '1px solid black'
                            }}
                            >
                                {songs[songId].title}
                            </div>
                      //  </Link>
                    )
                })
            }
        </div>
    )
}

export default AllSongs;
