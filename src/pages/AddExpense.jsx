import React from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGlobalState from "../UseGlobalState";
import { withRouter } from 'react-router-dom';
import DatePickerWrapper from "../components/DatePickerWrapper";
function AddExpense(props) {
    //return <p>add expense page</p>;
    const state = useGlobalState()
    const existingVal = []
    var i = 0;
    while (i in state.expenses) {
        existingVal.push({ id: state.expenses[i].id, name: state.expenses[i].name, amount: state.expenses[i].amount, date: state.expenses[i].date, frequency: state.expenses[i].date, duration: state.expenses[i].duration })
        i++;
    }
    return (
        <div style={{ margin: "60px" }}>
            <h1>New Expense</h1>
            <Form onSubmit={e => { e.preventDefault(); }}>
                <Form.Group controlId="addNewExpenseName">
                    <Form.Control type="text" placeholder="Netflix" />
                </Form.Group>
                <Form.Group controlId="addNewExpenseAmount">
                    <Form.Control type="text" placeholder="$0" />
                </Form.Group>
                <div>
                    <Form.Control id="frequency" as="select" style={{ width: "100%", marginBottom: "10px", marginTop: "20px" }}>
                        <option value="" disabled selected hidden>Frequency</option>
                        <option value="onetime">One Time</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </Form.Control>
                </div>


                <div>
                    <Form.Control id="category" as="select" style={{ width: "100%", marginBottom: "20px" }}>
                        <option value="" disabled selected hidden>Category</option>
                        <option value="necessity">Necessity</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="school supplies">School Supplies</option>
                        <option value="transportation">Transportation</option>
                    </Form.Control>
                </div>
                <div style={{ margin: "10px", width:"100%"}}>
                    <Form.Group style={{textAlign: "left"}}>
                        <h6 style={{display:"inline"}}>Start Date: </h6>
                        <DatePickerWrapper />
                    </Form.Group>
                </div>
                <Button variant="secondary" type="submit" onClick={() => {
                    let nam = document.getElementById("addNewExpenseName").value.toString();
                    let amoun = document.getElementById("addNewExpenseAmount").value.toString();
                    let dat = document.getElementById("addNewStartDate").value.toString()
                    let frequenc = document.getElementById("frequency").value.toString()
                    let categor = document.getElementById("category").value.toString()

                    if (!(nam && amoun && dat && frequenc && categor))
                        return;
                    state.setExpenses([{
                        id: Math.random(),
                        name: document.getElementById("addNewExpenseName").value,
                        amount: document.getElementById("addNewExpenseAmount").value,
                        date: document.getElementById("addNewStartDate").value,
                        frequency: document.getElementById("frequency").value,
                        category: document.getElementById("category").value
                    }, ...existingVal]);
                    props.history.push('/');
                }
                }>Save</Button>
            </Form>


        </div>
    );


}

export default AddExpense;
