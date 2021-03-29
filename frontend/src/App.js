import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Quiz from "./components/Quiz";
import TaskManager from "./components/taskmanager/TaskManager";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/taskmanager" component={TaskManager} />
        <Route exact path="/quiz" component={Quiz} />
      </Switch>
    </Router>
  );
};

export default App;
