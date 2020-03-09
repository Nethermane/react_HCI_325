import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

function AddIncome() {
  return (
      <div style={{margin: "60px"}}>
        <h1>New Income</h1>
        <Form>
          <Form.Group controlId="addNewIncomeName">
            <Form.Control type="text" placeholder="Income Name"/>
          </Form.Group>
          <Form.Group controlId="addNewIncomeAmount">
            <Form.Control type="text" placeholder="Income Amount ($0)"/>
          </Form.Group>
          <div>
            <Form.Group controlId="addNewStartDate">
              <Form.Control type="text" placeholder="Start Date"/>
            </Form.Group>
          </div>
          <div>
            <Form.Control as="select" style={{width: "100%", marginBottom: "10px"}}>
              <option value="" disabled selected hidden>Frequency</option>
              <option value="onetime">One Time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              </Form.Control>
          </div>


        </Form>

        <Link className="navItem" to="/home">
          <Button variant="secondary" type="submit">Save</Button>
        </Link>
      </div>
  );

}


export default AddIncome;
