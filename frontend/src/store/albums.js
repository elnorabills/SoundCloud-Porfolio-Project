import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const EDIT_ALBUM = "albums/EDIT_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

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

const editAlbum = (album) => {
  return {
    type: EDIT_ALBUM,
    payload: album,
  };
};

const deleteAlbumAction = (albumId) => {
  return {
    type: DELETE_ALBUM,
    payload: albumId,
  };
};

export const allAlbumsThunk = () => async (dispatch) => {
  let res = await csrfFetch("/albums");

  if (res.ok) {
    const data = await res.json();
    console.log("data", data);

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

export const editAlbumThunk = (albumId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/albums/${albumId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const editedAlbum = await response.json();
    dispatch(editAlbum(editedAlbum));
    return editedAlbum;
  }
};

export const deleteAlbumThunk = (albumId) => async (dispatch) => {
  const response = await csrfFetch(`/albums/${albumId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteAlbumAction(albumId));
  }
};

const albumsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_ALBUMS:
        return action.payload;
      case CREATE_ALBUM:
        return { ...state, ...action.payload };
      case EDIT_ALBUM:
        return { ...state, ...action.payload };
      case DELETE_ALBUM:
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
}

export default albumsReducer;
