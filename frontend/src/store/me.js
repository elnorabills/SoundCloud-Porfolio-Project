import { csrfFetch } from "./csrf";

const ME_SONGS = "me/ME_SONGS";
const ME_ALBUMS = "me/ME_ALBUMS";

const getMeSongs = (songs) => {
    return {
        type: ME_SONGS,
        payload: songs
    }
}

const getMeAlbums = (albums) => {
  return {
    type: ME_ALBUMS,
    payload: albums,
  };
};

export const meSongsThunk = () => async (dispatch) => {
  let res = await csrfFetch("/me/songs");

  if (res.ok) {
    const data = await res.json();

    const songsObj = {};
    data.allCreatedSongs.forEach((song) => {
      songsObj[song.id] = song;
    });
    dispatch(getMeSongs(songsObj));
  }
};

export const meAlbumsThunk = () => async (dispatch) => {
  let res = await csrfFetch("/me/albums");

  if (res.ok) {
    const data = await res.json();

    const albumsObj = {};
    data.allAlbums.forEach((album) => {
      albumsObj[album.id] = album;
    });
    dispatch(getMeAlbums(albumsObj));
  }
};

const meReducer = (state = {}, action) => {
    switch (action.type) {
      case ME_SONGS:
        return action.payload;
      case ME_ALBUMS:
        return action.payload;
      default:
        return state;
    }
}

export default meReducer;
