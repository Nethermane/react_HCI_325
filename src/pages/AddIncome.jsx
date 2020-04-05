import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGlobalState from "../UseGlobalState";
import DatePickerWrapper from "../components/DatePickerWrapper";
import StatusBar from "../components/StatusBar";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
function AddIncome(props) {
  const state = useGlobalState()
  const existingVal = []
  var i = 0;
  while (i in state.incomes) {
    existingVal.push({ id: state.incomes[i].id, name: state.incomes[i].name, amount: state.incomes[i].amount, date: state.incomes[i].date, category: states.incomes[i].category, frequency: state.incomes[i].frequency, duration: state.incomes[i].duration })
    i++;
  }
  const s = JSON.parse(JSON.stringify(useGlobalState()));
  var today = new Date();
  var incomes = s.incomes;
  var expenses = s.expenses;
  console.log(incomes)
  
  return (
    <div style={{ margin: "60px" }}>
      <div id="error" class="alert alert-danger" style={{display:"none", marginBottom:"0px"}} role="alert">
        <p id="errorText" style={{marginBottom:"0px"}}></p>
      </div>
      <h1>New Income</h1>
      <Form onSubmit={e => { e.preventDefault(); }}>
        <Form.Group controlId="addNewIncomeName">
          <Form.Control type="text" placeholder="Income Name (e.g. CoGro)" />
        </Form.Group>
        <Form.Group controlId="addNewIncomeAmount">
          <Form.Control type="text" placeholder="Income $ Amount (50)" />
        </Form.Group>
        <div>
          <Form.Control id="frequency" as="select" style={{ width: "100%", marginBottom: "10px" }}>
            <option value="onetime">One Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Form.Control>
        </div>
        <div style={{ margin: "10px", width: "100%" }}>
          <Form.Group style={{ textAlign: "left" }}>
            <h6 style={{ display: "inline" }}>Start Date: </h6>
            <DatePickerWrapper />
          </Form.Group>
        </div>
        <Button variant="secondary" type="submit" onClick={() => {
          document.getElementById("error").style.display = "none";
          let nam = document.getElementById("addNewIncomeName").value.toString();
          let amoun = document.getElementById("addNewIncomeAmount").value.toString();
          let dat = document.getElementById("addNewStartDate").value.toString()
          let frequenc = document.getElementById("frequency").value.toString()
          let errors = []
          if (!nam) {
            errors.push("Name field required")
          }
          if (!amoun) {
            errors.push("Amount field required")
          } else {
            let amo = parseFloat(amoun, 10);
            if (Number.isNaN(amo)) {
              errors.push("Amount must be numeric")
            }
          }
          if (!dat) {
            errors.push("Date field required")
          } else {
            let parsed = Date.parse(dat);
            if (isNaN(parsed)) {
              errors.push("Invalid date inputted")
            }
          }
          if (!frequenc) {
            errors.push("Frequency field required")
          }
          if (errors.length > 0) {
            document.getElementById("error").style.display = "block";
            document.getElementById("errorText").innerHTML = "Error:<br/>" + errors.join("<br\>")
            return;
          }
          var par = Date.parse(dat);
          state.setIncomes([{
            id: Math.random(),
            name: nam,
            amount: parseFloat(amoun, 10),
            date: formatDate(par),
            frequency: frequenc
          }, ...existingVal]);
          props.history.push('/home', { success: true });
        }}>Save</Button>
      </Form>


    </div>
  );

}


export default AddIncome;
