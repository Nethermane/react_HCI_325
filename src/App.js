import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Report from "./pages/Report";
import CashFlow from "./pages/CashFlow";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/report" component={Report} />
          <Route path="/cashflow" component={CashFlow} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
