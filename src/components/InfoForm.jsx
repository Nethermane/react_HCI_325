import React from "react";
import "./Cashflow.css";
import { Container, Col, Row } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalState from "../UseGlobalState";

function InfoForm(props) {
  const state = useGlobalState();
  const { name, amount, frequency, date, id } = props.data;
  return (
    <div className="cashflow-row">
      <Container>
        <Row>
          <Col>
            <div className="name cf-item">{name}</div>
          </Col>
          <Col>
            <div className="amount cf-item">{amount}$</div>
          </Col>
          <Col>
            <div className="frequency cf-item">{frequency}</div>
          </Col>
          <Col>
            <div className="date cf-item">{date}</div>
          </Col>
          <button
            onClick={() => {
              var temp = props.existingVals.filter(element => element.id != id);
              props.type == "goal" && state.setGoals(temp);
              props.type == "income" && state.setIncomes(temp);
              props.type == "expense" && state.setExpenses(temp);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </Row>
      </Container>
    </div>
  );
}

export default InfoForm;
