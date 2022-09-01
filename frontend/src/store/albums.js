import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS";
const CREATE_ALBUM = "albums/CREATE_ALBUM";

const getAllAlbumsAction = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        payload: albums
    }
}

const createAlbumAction = (album) => {
    return {
        type: CREATE_ALBUM,
        payload: album
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

export const createAlbumThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch("/albums", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newAlbum = await response.json();
    dispatch(createAlbumAction(newAlbum));
    return newAlbum;
  }
};

const albumsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_ALBUMS:
        return action.payload;
      case CREATE_ALBUM:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}

export default albumsReducer;
