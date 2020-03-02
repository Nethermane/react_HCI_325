import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import SideNav from "./pages/SideNav";
import Home from "./pages/Home";
import Expenses from "./pages/Report";
import Account from "./pages/CashFlow";
import AddExpense from "./pages/AddExpense";
import AddGoal from "./pages/AddGoal";
import AddIncome from "./pages/AddIncome";

import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Container>
          <Row>
            <Col className="sidenav" xs={3}>
              <SideNav />
            </Col>
            <Col xs={12}>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/expenses" component={Expenses} />
                <Route path="/account" component={Account} />
                <Route path="/addgoal" component={AddGoal} />
                <Route path="/addexpense" component={AddExpense} />
                <Route path="/addincome" component={AddIncome} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
