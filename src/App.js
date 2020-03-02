import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";  
import Account from "./pages/Account";
import login from "./pages/login";


function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== '/login' ? <Nav /> : null}
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/account" component={Account} />
      <Route path="/login" component={login} />
    </div>
  );
}

export default withRouter(App);
