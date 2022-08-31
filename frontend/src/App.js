import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import AllSongs from "./components/AllSongs/AllSongs";
import SingleSong from "./components/SingleSong/SingleSong";
import AllAlbums from "./components/AllAlbums/AllAlbums";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreSessionUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

    return (
      <>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <h1>Home</h1>
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
            <Route>
              <h1>404: Not Found</h1>
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
