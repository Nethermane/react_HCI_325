import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGlobalState from "../UseGlobalState";
import DatePickerWrapper from "../components/DatePickerWrapper";

function AddIncome(props) {
  const state = useGlobalState()
  const existingVal = []
  var i = 0;
  while (i in state.incomes) {
    existingVal.push({ id: state.incomes[i].id, name: state.incomes[i].name, amount: state.incomes[i].amount, date: state.incomes[i].date, frequency: state.incomes[i].date, duration: state.incomes[i].duration })
    i++;
  }
  return (
    <div style={{ margin: "60px" }}>
      <h1>New Income</h1>
      <Form onSubmit={e => { e.preventDefault(); }}>
        <Form.Group controlId="addNewIncomeName">
          <Form.Control type="text" placeholder="Income Name" />
        </Form.Group>
        <Form.Group controlId="addNewIncomeAmount">
          <Form.Control type="text" placeholder="Income Amount ($0)" />
        </Form.Group>
        <div style={{ margin: "10px", width: "100%" }}>
          <Form.Group style={{ textAlign: "left" }}>
            <h6 style={{ display: "inline" }}>Start Date: </h6>
            <DatePickerWrapper />
          </Form.Group>
        </div>
        <div>
          <Form.Control id="frequency" as="select" style={{ width: "100%", marginBottom: "10px" }}>
            <option value="" disabled selected hidden>Frequency</option>
            <option value="onetime">One Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Form.Control>
        </div>
        <div>
          <Form.Group controlId="addNewDuration">
            <Form.Control type="text" placeholder="Duration (in Weeks/Months)" />
          </Form.Group>
        </div>
        <Button variant="secondary" type="submit" onClick={() => {
          let nam = document.getElementById("addNewIncomeName").value.toString();
          let amoun = document.getElementById("addNewIncomeAmount").value.toString();
          let dat = document.getElementById("addNewStartDate").value.toString()
          let duratio = document.getElementById("addNewDuration").value.toString()
          let frequenc = document.getElementById("frequency").value.toString()

          if (!(nam && amoun && dat && duratio && frequenc))
            return;
          state.setIncomes([{
            id: Math.random(),
            name: nam,
            amount: amoun,
            date: dat,
            duration: duratio,
            frequency: frequenc
          }, ...existingVal]);
          props.history.push('/');
        }}>Save</Button>
      </Form>


    </div>
  );

}


export default AddIncome;
