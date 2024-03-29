import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
const EDIT_SONG = 'songs/EDIT_SONG';
const GET_ONE_SONG = 'songs/GET_ONE_SONG';
const CREATE_SONG = "songs/CREATE_SONG";
const DELETE_SONG = "songs/DELETE_SONG";

const deleteSongAction = (songId) => {
  return {
    type: DELETE_SONG,
    payload: songId
  };
};

const editSong = (song) => {
  return {
    type: EDIT_SONG,
    payload: song
  }
}

const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
    }
}

const getOneSong = (song) => {
  return {
    type: GET_ONE_SONG,
    payload: song,
  };
};

const createSongAction = (song) => {
  return {
    type: CREATE_SONG,
    payload: song,
  };
};

export const allSongsThunk = () => async dispatch => {
    let allSongs = await csrfFetch("/api/songs");

    if (allSongs.ok) {
        const data = await allSongs.json()

        const songsObj = {}
        data.allSongs.forEach(song => {
            songsObj[song.id] = song
        })
        dispatch(getAllSongs(songsObj));
    }
}

export const oneSongThunk = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(getOneSong(song));
  }
};

export const createSongThunk = (payload, albumId) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newSong = await response.json();
    dispatch(createSongAction(newSong));
    return newSong;
  }
};

export const editSongThunk = (songId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const editedSong = await response.json();
    dispatch(editSong(editedSong));
    return editedSong;
  }
};

export const deleteSongThunk = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    dispatch(deleteSongAction(songId));
  }
};

const songsReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_ALL_SONGS:
        return action.payload;
      case GET_ONE_SONG:
        return action.payload;
      case CREATE_SONG:
        return { ...state, ...action.payload };
      case EDIT_SONG:
        return { ...state, ...action.payload };
      case DELETE_SONG:
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
      default:
        return state;
    }
}

export default songsReducer;
