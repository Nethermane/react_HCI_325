import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import SideNav from "./pages/SideNav";
import Home from "./pages/Home";
import Reports from "./pages/Report";
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
        <Container fluid>
          <Row>
            <Col xs={2}>
              <SideNav />
            </Col>
            <Col className="page" xs={10}>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route path="/reports" component={Reports} />
                <Route path="/cashflows" component={Account} />
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
