import React from "react";
import {Button, Form, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function AddExpense() {
  //return <p>add expense page</p>;
  return (
      <div style={{ position: "absolute",top: "20%", left: "50%",transform: "translate(-50%, 50%)"}}>
        <div>
          <h1>New Expense</h1>
          <Form>
            <Form.Group controlId="addNewExpenseName">
              <Form.Control type="text" placeholder="Netflix" />
            </Form.Group>
            <Form.Group controlId="addNewExpenseAmount">
              <Form.Control type="text" placeholder="$0" />
            </Form.Group>
            <label>Frequency</label>
            <select value="Radish">
              <option value="Orange">Orange</option>
              <option value="Radish">Radish</option>
              <option value="Cherry">Cherry</option>
            </select>

            <div class={"dropdown"}>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Frequency
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">One Time</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Yearly</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">One Time</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Weekly</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Monthly</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Yearly</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Form>

          <Link className="navItem" to="/home">
            <Button variant="secondary">Save</Button>
          </Link>
        </div>
      </div>
  );



}

export default AddExpense;
