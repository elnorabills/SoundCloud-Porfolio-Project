import { useDispatch, useSelector } from 'react-redux';
import { oneAlbumThunk } from '../../store/albums';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SingleAlbum () {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const album = useSelector(state => state.albums);

    useEffect(() => {
        dispatch(oneAlbumThunk(albumId))
    }, [dispatch, albumId]);

    return (
      <div>
        <h1>{album.title}</h1>
      </div>
    );
}

export default SingleAlbum;
