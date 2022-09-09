import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { deleteAlbumThunk } from '../../store/albums';
import { meAlbumsThunk } from "../../store/me";
import CreateSongButtonComp from '../CreateSongForm/CreateSongButton';
import EditAlbumButtonComp from '../EditAlbumForm/EditAlbumButton';

function SingleAlbum () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
    }, [dispatch, albumId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(deleteAlbumThunk(albumId)).then(() => dispatch(meAlbumsThunk()));
      history.push("/me/albums")
    };

    if (!sessionUser) return <Redirect to="/" />;

    if (!album) return <Redirect to="/me/albums" />;

    let sessionUserActions;

    if (sessionUser.id === album.userId) {
      sessionUserActions = (
        <div className="delete-album-button-container">
          <button className="delete-album-button" onClick={handleSubmit}>
            Delete
          </button>
          <div className="create-song-button-comp">
            <CreateSongButtonComp />
          </div>
          <div>
            <EditAlbumButtonComp />
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>{album.title}</h1>
        <h2>{album.description}</h2>
        <div className="session-user-actions">{sessionUserActions}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
        </div>
      </div>
    );
}

export default SingleAlbum;
