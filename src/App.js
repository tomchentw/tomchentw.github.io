import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Index from "./Pages/Index";
import ReactGoogleMaps from "./Pages/Demos/ReactGoogleMaps";
import "./App.css";

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route
        exact
        path="/demos/react-google-maps"
        component={ReactGoogleMaps}
      />
      <Route render={() => "404 Page"} />
    </Switch>
  </HashRouter>
);

export default App;
