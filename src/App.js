import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/expenses" component={Expenses} />
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
