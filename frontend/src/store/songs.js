
import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
//const CLEAR_SONGS = 'songs/CLEAR_SONGS';
// const EDIT_SONG = 'songs/EDIT_SONG';
const GET_ONE_SONG = 'songs/GET_ONE_SONG';
const CREATE_SONG = "songs/CREATE_SONG";

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

// export const clearSongsAction = () => {
//     return {
//         type: CLEAR_SONGS,
//         payload: {}
//     }
// }



export const allSongsThunk = () => async dispatch => {
    let allSongs = await csrfFetch("/songs");

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
  const res = await csrfFetch(`/songs/${songId}`);

  if (res.ok) {
    const song = await res.json();
    dispatch(getOneSong(song));
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

const songsReducer = (state = {}, action) => {
    //const newState = { ...state };
    switch (action.type) {
      case GET_ALL_SONGS:
        return action.payload;
      case GET_ONE_SONG:
        return action.payload;
      case CREATE_SONG:
        return { ...state, ...action.payload };
      // case CLEAR_SONGS:
      //     return action.payload
      default:
        return state;
    }
}

export default songsReducer;
