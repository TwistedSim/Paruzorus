import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import TaskManager from "./components/TaskManager";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/taskmanager" component={TaskManager} />
      </Switch>
    </Router>
  );
}

export default App;
