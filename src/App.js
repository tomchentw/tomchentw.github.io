import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Index from "./Pages/Index";
import "./App.css";

const App = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route render={() => "404 Page"} />
    </Switch>
  </HashRouter>
);

export default App;
