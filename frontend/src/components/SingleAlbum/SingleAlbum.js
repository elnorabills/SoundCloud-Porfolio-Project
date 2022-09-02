import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { meSongsThunk } from "../../store/me";

function SingleAlbum () {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);
    const albumSongs = useSelector(state => state.me);

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
        dispatch(meSongsThunk())
    }, [dispatch, albumId]);

    return (
      <div>
        <h1>{album.title}</h1>
        <h2>{album.description}</h2>
        <button>Edit</button>
        <button>Delete</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {Object.keys(albumSongs).map((songId) => {
            return (
             // <Link key={songId} to={`/songs/${songId}`}>
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "1px solid black",
                  }}
                >
                  {albumSongs[songId].title}
                </div>
             // </Link>
            );
          })}
        </div>
      </div>
    );
}

export default SingleAlbum;
