import { oneSongThunk } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { deleteSongThunk } from "../../store/songs";
import { meSongsThunk } from "../../store/me";
import EditSongButtonComp from "../EditSongForm/EditSongButton";
import "./SingleSong.css";

function SingleSong () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    const song = useSelector((state) => state.songs);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(oneSongThunk(songId))
    }, [dispatch, songId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(deleteSongThunk(songId)).then(() => dispatch(meSongsThunk()));
      history.push("/me/songs");
    };

    if (!sessionUser) return <Redirect to="/" />;

    let songOne;
    if (song.id === 1) {
      songOne = (
        <div className="all-user-songs" id="1"></div>
      )
    }

     let songTwo;
     if (song.id === 2) {
       songTwo = <div className="all-user-songs" id="2"></div>;
     }

     let songThree;
     if (song.id === 3) {
       songThree = (
         <div className="all-user-songs" id="3"></div>
       );
     }

     let songFour;
     if (song.id === 4) {
       songFour = (
         <div className="all-user-songs" id="4"></div>
       );
     }

     let songFive;
     if (song.id === 5) {
       songFive = (
         <div className="all-user-songs" id="5"></div>
       );
     }

     let songSix;
     if (song.id === 6) {
       songSix = (
         <div className="all-user-songs" id="6"></div>
       );
     }

     let songSeven;
     if (song.id === 7) {
       songSeven = (
         <div className="all-user-songs" id="7"></div>
       );
     }

     let songEight;
     if (song.id === 8) {
       songEight = (
         <div className="all-user-songs" id="8"></div>
       );
     }

     let songNine;
     if (song.id === 9) {
       songNine = (
         <div className="all-user-songs" id="9"></div>
       );
     }

     let songTen;
     if (song.id === 10) {
       songTen = (
         <div className="all-user-songs" id="10"></div>
       );
     }

     let songEleven;
     if (song.id === 11) {
       songEleven = (
         <div className="all-user-songs" id="11"></div>
       );
     }

     let songTwelve;
     if (song.id === 12) {
       songTwelve = (
         <div className="all-user-songs" id="12"></div>
       );
     }

     let songThirteen;
     if (song.id === 13) {
       songThirteen = (
         <div className="all-user-songs" id="13"></div>
       );
     }

     let songFourteen;
     if (song.id === 14) {
       songFourteen = (
         <div className="all-user-songs" id="14"></div>
       );
     }

    let sessionUserActions;

    if (sessionUser.id === song.userId) {
      sessionUserActions = (
        <div className="ed-song-button-container">
          <div className="ed-delete-song-button">
            <button className="delete-song-button" onClick={handleSubmit}>
              Delete
            </button>
          </div>
            <EditSongButtonComp />
        </div>
      );
    }

    let existingSong;
    if (song) {
      existingSong = (
        <div className="single-song-container">
          <h1 className="h1-single-song-title">{song.title}</h1>
          <h2 className="h2-single-song-description">{song.description}</h2>
          <div className="small-single-song-container">
            <div className="all-user-songs">
              <div>{songOne}</div>
              <div>{songTwo}</div>
              <div>{songThree}</div>
              <div>{songFour}</div>
              <div>{songFive}</div>
              <div>{songSix}</div>
              <div>{songSeven}</div>
              <div>{songEight}</div>
              <div>{songNine}</div>
              <div>{songTen}</div>
              <div>{songEleven}</div>
              <div>{songTwelve}</div>
              <div>{songThirteen}</div>
              <div>{songFourteen}</div>
            </div>
          </div>
          <div className="session-user-actions">{sessionUserActions}</div>
        </div>
      );
    }

    return (
      <div>
        {existingSong}
      </div>
    );
}

export default SingleSong;
