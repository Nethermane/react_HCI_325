import React from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import useGlobalState from "../UseGlobalState";

// class AddGoal extends React.Component {
// constructor() {
//   super();

//   this.state = {
//     goals: [{ label: "New Phone", amount: "10", frequency: "monthly" }, { label: "A car", amount: "50", frequency: "weekly" }],
//     frequency: "day"
//   };
// }
// removeGoal(goal, index) {
//   var newState = this.state;
//   newState.goals.splice(index, 1);
//   this.setState(newState)
// }
// addGoal() {
//   this.setState(prevState => ({
//     goals: [...prevState.goals, { amount: prevState.amount, frequency: prevState.frequency, label: prevState.label }],
//     frequency: "day",
//     amount: "",
//     label: ""
//   }))
//   document.getElementById("inputForm").reset();
// }
// render() {
function AddGoal() {
  const state = useGlobalState()
  console.log(state.goals)
  var existingGoals = []
  var i = 0;
  var existingVal = []
  while (i in state.goals) {
    existingVal.push({id:state.goals[i].id, name: state.goals[i].name, goals:state.goals[i].name, frequency: state.goals[i].name})
    existingGoals.push(
      <tr>
        <td>{state.goals[i].name}</td>
        <td>${state.goals[i].amount}/{state.goals[i].frequency}</td>
        <td><button>&#10060;</button></td>
      </tr>
    )
    i++;
  }
  // let existingGoals = goals.map((goal, index) =>
  //   <tr>
  //     <td>{goal.label}</td>
  //     <td>${goal.amount}/{goal.frequency}</td>
  //     <td><button onClick={() => this.removeGoal(goal, index)}>&#10060;</button></td>
  //   </tr >
  // )
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <form id="inputForm" tyle={{ margin: "auto", marginTop: "10%" }} onSubmit={e => { e.preventDefault(); }}>
        <div style={{ display: "inline-block" }}>
          <label>
            I want to set aside $
              <Form.Control type="text" size="5" placeholder="5" id="amount" />
            &nbsp;every&nbsp;
              <Form.Control as="select" id="frequency">
              <option>day</option>
              <option>week</option>
              <option>month</option>
              <option>year</option>
            </Form.Control>
            &nbsp;for&nbsp;
              <Form.Control type="text" size="10" placeholder="college" id="label" />
          </label>
        </div>
        <br />
        <Button type="submit" value="Save" onClick={() => state.setGoals([{ id: Math.random(), name: document.getElementById("label").value, amount: document.getElementById("amount").value, frequency: document.getElementById("frequency").value }, ...existingVal])}>Submit</Button>
      </form>
      <table style={{ width: "60%", margin: "auto", marginTop: "10%" }}>
        <tbody>
          <tr>
            <th>Goal</th>
            <th>Amount</th>
            <th></th>
          </tr>
          {existingGoals}
        </tbody>
      </table>

    </div>)
}


export default AddGoal;
