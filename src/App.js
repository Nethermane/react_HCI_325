import React from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import SideNav from "./pages/SideNav";
import Home from "./pages/Home";
import login from "./pages/login";
import Reports from "./pages/Report";
import Account from "./pages/CashFlow";
import AddExpense from "./pages/AddExpense";
import AddGoal from "./pages/AddGoal";
import AddIncome from "./pages/AddIncome";

import { Container, Row, Col } from "react-bootstrap";

function App(props) {
  return (
    <div className="App">
      {props.location.pathname !== "/login" ? <Nav /> : null}
      <Container>
        <Row>
          <Col className="sidenav" xs={3}>
            {props.location.pathname !== "/login" ? <SideNav /> : null}
          </Col>
          <Col className="page" xs={10}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route path="/reports" component={Reports} />
              <Route path="/cashflows" component={Account} />
              <Route path="/addgoal" component={AddGoal} />
              <Route path="/addexpense" component={AddExpense} />
              <Route path="/addincome" component={AddIncome} />
              <Route path="/login" component={login} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(App);
