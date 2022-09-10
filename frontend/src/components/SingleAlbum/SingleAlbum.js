import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { deleteAlbumThunk } from '../../store/albums';
import { meAlbumsThunk } from "../../store/me";
import CreateSongButtonComp from '../CreateSongForm/CreateSongButton';
import EditAlbumButtonComp from '../EditAlbumForm/EditAlbumButton';
import { Link } from "react-router-dom";
import "./SingleAlbum.css";

function SingleAlbum () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);
    const sessionUser = useSelector((state) => state.session.user);
    const { Songs } = album;

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
    }, [dispatch, albumId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(deleteAlbumThunk(albumId)).then(() => dispatch(meAlbumsThunk()));
      history.push("/me/albums")
    };

    if (!sessionUser) return <Redirect to="/" />;

    let sessionUserActions;

    if (sessionUser.id === album.userId) {
      sessionUserActions = (
        <div className="edc-album-button-container">
          <div className="edc-delete-album-button">
            <button className="delete-album-button" onClick={handleSubmit}>
              Delete
            </button>
          </div>
            <CreateSongButtonComp />

            <EditAlbumButtonComp />
        </div>
      );
    }

   let existingAlbum;
    if (album) {
      existingAlbum = (
        <div className="single-album-container">
          <h1 className="h1-single-album-title">{album.title}</h1>
          <h2 className="h2-single-album-description">{album.description}</h2>
          <div className="small-single-album-container">
            <div className="all-user-albums" id={album.id}>
              {album.title}
            </div>
          </div>
          <div className="session-user-actions">{sessionUserActions}</div>
          <h3 className='h3-album-songs'>Album Songs</h3>
          <div className="all-album-songs-container">
            <div className="album-songs-list">
              {Songs &&
                Songs.map((song) => {
                  return (
                    <Link className="nav-link" to={`/songs/${song.id}`}>
                      <div className="all-user-songs" id={song.id}>
                        {song.title}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {existingAlbum}
      </div>
    );
}

export default SingleAlbum;
