import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = "songs/GET_ALL_ALBUMS";

const getAllAlbumsAction = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        payload: albums
    }
}

export const allAlbumsThunk = () => async (dispatch) => {
  let res = await csrfFetch("/albums");

  if (res.ok) {
    const data = await res.json();

    const albumsObj = {};
    data.allAlbums.forEach((album) => {
      albumsObj[album.id] = album;
    });
    dispatch(getAllAlbumsAction(albumsObj));
  }
};

export const oneAlbumThunk = (albumId) => async (dispatch) => {
  let res = await csrfFetch(`/albums/${albumId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(getAllAlbumsAction(data));
  }
};

const albumsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_ALBUMS:
            return action.payload
        default:
            return state
    }
}

export default albumsReducer;
