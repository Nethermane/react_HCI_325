import React from "react";
import {Button, Form, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function AddExpense() {
    //return <p>add expense page</p>;
    return (
        <div style={{margin: "60px"}}>
            <h1>New Expense</h1>
            <Form>
                <Form.Group controlId="addNewExpenseName">
                    <Form.Control type="text" placeholder="Netflix"/>
                </Form.Group>
                <Form.Group controlId="addNewExpenseAmount">
                    <Form.Control type="text" placeholder="$0"/>
                </Form.Group>
                <div>
                  <Form.Control as="select" style={{width: "100%", marginBottom: "10px", marginTop: "20px"}}>
                        <option value="" disabled selected hidden>Frequency</option>
                        <option value="onetime">One Time</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                  </Form.Control>
                </div>


                <div>
                  <Form.Control as="select" style={{width: "100%", marginBottom: "20px"}}>
                        <option value="" disabled selected hidden>Category</option>
                        <option value="necessity">Necessity</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="school supplies">School Supplies</option>
                        <option value="transportation">Transportation</option>
                  </Form.Control>
                </div>
                <div>
                    <Form.Group controlId="addNewStartDate">
                        <Form.Control type="text" placeholder="Start Date"/>
                    </Form.Group>
                </div>
                <div>
                    <Form.Group controlId="addNewDuration">
                        <Form.Control type="text" placeholder="Duration (Weeks)"/>
                    </Form.Group>
                </div>

            </Form>

            <Link className="navItem" to="/home">
                <Button variant="secondary" type="submit">Save</Button>
            </Link>
        </div>
    );


}

export default AddExpense;
