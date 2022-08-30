import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import AllSongs from "./components/AllSongs/allSongs";

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
            <Route path="/songs">
              <AllSongs />
            </Route>
          </Switch>
        )}
      </>
    );
}

export default App;
