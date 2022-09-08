import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import SingleSong from "./components/SingleSong/SingleSong";
import AllAlbums from "./components/AllAlbums/AllAlbums";
import SingleAlbum from "./components/SingleAlbum/SingleAlbum";
import UserSongs from "./components/UserSongs/UserSongs";
import UserAlbums from "./components/UserAlbums/UserAlbums";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/Home/Home";
import UserHomePage from "./components/UserPage/UserPage";
import AllSongs from "./components/AllSongs/AllSongs";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  let homePage;
  if (sessionUser) {
    homePage = <UserHomePage />;
  } else {
    homePage = <HomePage />
  }

    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              {homePage}
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/sign-up">
              <SignupFormPage />
            </Route>
            <Route exact path="/songs">
              <AllSongs />
            </Route>
            <Route path="/songs/:songId">
              <SingleSong />
            </Route>
            <Route exact path="/albums">
              <AllAlbums />
            </Route>
            <Route path="/albums/:albumId">
              <SingleAlbum />
            </Route>
            <Route path="/me/songs">
              <UserSongs />
            </Route>
            <Route path="/me/albums">
              <UserAlbums />
            </Route>
            <Route>
              <h1>404: Not Found</h1>
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
