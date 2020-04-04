import React from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGlobalState from "../UseGlobalState";
import { withRouter } from 'react-router-dom';
import DatePickerWrapper from "../components/DatePickerWrapper";

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

function AddExpense(props) {
    //return <p>add expense page</p>;
    const state = useGlobalState()
    const existingVal = []
    var i = 0;
    while (i in state.expenses) {
        existingVal.push({ id: state.expenses[i].id, name: state.expenses[i].name, amount: state.expenses[i].amount, date: state.expenses[i].date, category: state.expenses[i].category, frequency: state.expenses[i].frequency, duration: state.expenses[i].duration })
        i++;
    }
    var categories = [];
    i = 0;
    while (i in state.categories) {
        categories.push(<option value={state.categories[i].name}>{state.categories[i].name}</option>)
        i++;
    }
    return (
        <div style={{ margin: "60px" }}>
            <div id="error" class="alert alert-danger" style={{ display: "none", marginBottom: "0px" }} role="alert">
                <p id="errorText" style={{ marginBottom: "0px" }}></p>
            </div>
            <h1>New Expense</h1>
            <Form onSubmit={e => { e.preventDefault(); }}>
                <Form.Group controlId="addNewExpenseName">
                    <Form.Control type="text" placeholder="Name (e.g. Netflix)" />
                </Form.Group>
                <Form.Group controlId="addNewExpenseAmount">
                    <Form.Control type="text" placeholder="$ Amount (e.g. 20)" />
                </Form.Group>
                <div>
                    <Form.Control id="frequency" as="select" style={{ width: "100%", marginBottom: "10px", marginTop: "20px" }}>
                        <option value="onetime">One Time</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </Form.Control>
                </div>


                <div>
                    <Form.Group style={{ textAlign: "left" }}>
                        <h6 style={{ display: "inline-block" }}>Category: </h6>
                        <Form.Control id="category" as="select" style={{ marginBottom: "20px" }}>
                            {categories}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div style={{ margin: "10px", width: "100%" }}>
                    <Form.Group style={{ textAlign: "left" }}>
                        <h6 style={{ display: "inline" }}>Start Date: </h6>
                        <DatePickerWrapper />
                    </Form.Group>
                </div>
                <Button variant="secondary" type="submit" onClick={() => {
                    let nam = document.getElementById("addNewExpenseName").value.toString();
                    let amoun = document.getElementById("addNewExpenseAmount").value.toString();
                    let dat = document.getElementById("addNewStartDate").value.toString()
                    let frequenc = document.getElementById("frequency").value.toString()
                    let categor = document.getElementById("category").value.toString()
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
                    if (!(nam && amoun && dat && frequenc && categor))
                        return;
                    state.setExpenses([{
                        id: Math.random(),
                        name: document.getElementById("addNewExpenseName").value,
                        amount: parseFloat(amoun),
                        date: formatDate(par),
                        duration: 1,
                        category: document.getElementById("category").value,
                        frequency: document.getElementById("frequency").value,
                    }, ...existingVal]);
                    props.history.push('/home', { success: true });
                }
                }>Save</Button>
            </Form>
        </div>
    );


}

export default AddExpense;
