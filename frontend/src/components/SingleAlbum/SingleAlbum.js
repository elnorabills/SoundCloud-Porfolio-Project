import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
//import { meSongsThunk } from "../../store/me";
import { Redirect } from "react-router-dom";
import CreateSongForm from '../CreateSongForm/CreateSongForm';
import { deleteAlbumThunk } from '../../store/albums';

function SingleAlbum () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);
    //const albumSongs = useSelector(state => state.me);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
       // dispatch(meSongsThunk())
    }, [dispatch, albumId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(deleteAlbumThunk(albumId));
      history.push("/me/albums")
    };

    if (!sessionUser) return <Redirect to="/" />;

    let sessionUserActions;

    if (sessionUser.id === album.userId) {
      sessionUserActions = (
        <div className='delete-album-button-container'>
          <button className="delete-album-button" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      );
    }

    return (
      <div>
        <h1>{album.title}</h1>
        <h2>{album.description}</h2>
        <button>Edit</button>
        <button>Add Song</button>
        <div className='session-user-actions'>{sessionUserActions}</div>
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
