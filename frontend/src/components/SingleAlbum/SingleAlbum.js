import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
//import { meSongsThunk } from "../../store/me";
import { Redirect } from "react-router-dom";
import CreateSongForm from '../CreateSongForm/CreateSongForm';

function SingleAlbum () {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);
    //const albumSongs = useSelector(state => state.me);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
       // dispatch(meSongsThunk())
    }, [dispatch, albumId]);

    if (!sessionUser) return <Redirect to="/" />;

    return (
      <div>
        <h1>{album.title}</h1>
        <h2>{album.description}</h2>
        <button>Edit</button>
        <button>Delete</button>
        <button>Add Song</button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* {Object.keys(albumSongs).map((songId) => {
            return (
             // <Link key={songId} to={`/songs/${songId}`}>
                <div key={songId}
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
          })} */}
        </div>
        <div>
          {<CreateSongForm />}
        </div>
      </div>
    );
}

export default SingleAlbum;
