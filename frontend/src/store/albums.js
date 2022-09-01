import { csrfFetch } from "./csrf";

const GET_ALL_ALBUMS = "albums/GET_ALL_ALBUMS";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const CREATE_SONG = "albums/CREATE_SONG";

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

const createSongAction = (song) => {
  return {
    type: CREATE_SONG,
    payload: song,
  };
};

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

export const createSongThunk = (payload, albumId) => async (dispatch) => {
  const response = await csrfFetch(`/albums/${albumId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newSong = await response.json();
    dispatch(createSongAction(newSong));
    return newSong;
  }
};

const albumsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_ALBUMS:
        return action.payload;
      case CREATE_ALBUM:
        return { ...state, ...action.payload };
      case CREATE_SONG:
        return { ...state, ...action.payload };
      default:
        return state;
    }
}

export default albumsReducer;
