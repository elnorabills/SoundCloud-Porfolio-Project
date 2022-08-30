import { csrfFetch } from "./csrf";

const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';

const getAllSongs = (songs) => {
    return {
        type: GET_ALL_SONGS,
        payload: songs
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
