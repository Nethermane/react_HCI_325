import React from "react";
import "./Cashflow.css";
import { Container, Col, Row } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalState from "../UseGlobalState";

function InfoForm(props) {
  const state = useGlobalState();
  const { name, amount, frequency, date, id } = props.data;
  const temp = [];

  const onClick = () => {
    // var temp = props.existingVals.filter((element) => element.id != id);
    for (var element in props.existingVals) {
      if (props.existingVals[element].id == id) {
        var today = new Date();
        var current_year = today.getFullYear();
        var current_month = today.getMonth() + 1;
        var current_day = today.getDate();
        if (current_month < 10) {
          var current = current_year + "-0" + current_month + "-" + current_day;
        } else {
          var current = current_year + "-" + current_month + "-" + current_day;
        }
        props.existingVals[element].end_date = current;

        temp.push(props.existingVals[element]);
      } else {
        temp.push(props.existingVals[element]);
      }
    }
    props.type == "income" && state.setIncomes(temp);
    props.type == "expense" && state.setExpenses(temp);
  };

  return (
    <div className="cashflow-row">
      <Container>
        <Row>
          <Col>
            <div className="name cf-item">{name}</div>
          </Col>
          <Col>
            <div className="amount cf-item">${amount}</div>
          </Col>
          <Col>
            <div className="frequency cf-item">{frequency}</div>
          </Col>
          <Col>
            <div className="date cf-item">{date}</div>
          </Col>
          <button onClick={onClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Row>
      </Container>
    </div>
  );
}

export default InfoForm;
