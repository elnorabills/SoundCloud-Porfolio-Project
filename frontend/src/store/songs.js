import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
const DELETE_SONG = 'songs/DELETE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const GET_ONE_SONG = 'songs/GET_ONE_SONG';

const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
    }
}

const deleteSongAction = (id) => {
    return {
        type: DELETE_SONG,
        payload: null
    }
}

export const allSongsThunk = () => async dispatch => {
    let allSongs = await csrfFetch("/songs");

    if (allSongs.ok) {
        const data = await allSongs.json()
        console.log(data);
        const songsObj = {}
        data.allSongs.forEach(song => {
            songsObj[song.id] = song
        })
        dispatch(getAllSongs(songsObj));
    }
}

const songsReducer = (state = {}, action) => {
    //const newState = { ...state };
    switch (action.type) {
        case GET_ALL_SONGS:
            return action.payload
        default:
            return state;
    }
}

export default songsReducer;
