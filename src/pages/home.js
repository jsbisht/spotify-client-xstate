import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
// import Categories from "./categories";
import Playlists from "./playlists";
import Tracks from "./tracks";

function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Playlists />
        </Route>
        <Route exact path={`/playlist/:playlistId`}>
          <Tracks />
        </Route>
      </Switch>
    </Router>
  );
}

export default Home;
