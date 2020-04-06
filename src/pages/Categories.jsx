import React from "react";
import useGlobalState from "../UseGlobalState";
import InfoForm from "../components/InfoForm";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Dropdown } from "react-bootstrap";
import "./CashFlow.css";
function buttonRemove(id, state) {
    var i = 0;
    var existingVal = []
    while (i in state.categories) {
        if (state.categories[i].id != id) {
            existingVal.push({ id: state.categories[i].id, name: state.categories[i].name, max: state.categories[i].max })
        }
        i++;
    }
    state.setCategories(existingVal)
}
function Categories() {
    const state = useGlobalState()
    var existingCat = []
    var i = 0;
    var existingVal = []
    while (i in state.categories) {
        const id = state.categories[i].id
        existingVal.push({ id: state.categories[i].id, name: state.categories[i].name, max: state.categories[i].max })
        existingCat.push(
            <tr>
                <td>{state.categories[i].name}</td>
                <td>${state.categories[i].max}</td>

                <td className="cashflow-row"><button class=".cashflow-row button" id={id} onClick={() => buttonRemove(id, state)}><FontAwesomeIcon icon={faTimes} /></button></td>
            </tr>
        )
        i++;
    }
    console.log(state)
    return (
        <div>
            <div id="error" class="alert alert-danger" style={{ display: "none", marginBottom: "0px" }} role="alert">
                <p id="errorText" style={{ marginBottom: "0px" }}></p>
            </div>
            <Form id="inputForm" style={{ margin: "auto", marginTop: "10%" }} onSubmit={e => { e.preventDefault(); }}>
                <div style={{ display: "inline-block" }}>
                    Name:
                    <Form.Control type="text" size="5" placeholder="Fun" id="category" />
                    Monthly Max($):
                    <Form.Control type="text" size="10" placeholder="500" id="max" />
                </div>
                <br />
                <br />
                <Button type="submit" value="Save" onClick={() => {
                    document.getElementById("error").style.display = "none";
                    let errors = []
                    let amoun = document.getElementById("max").value
                    if (document.getElementById("category").value == "") {
                        errors.push("Category field required")
                    }
                    if (amoun == "") {
                        errors.push("Max required")
                    } else {
                        let amo = parseFloat(amoun, 10);
                        const regex = /^[0-9]*.?[0-9]*$/;
                        if (!amoun.match(regex)) {
                            errors.push("Max must be numeric")
                        } else if (amo < 0) {
                            errors.push("Max must be positive")
                        }
                    }
                    if (errors.length > 0) {
                        document.getElementById("error").style.display = "block";
                        document.getElementById("errorText").innerHTML = "Error:<br/>" + errors.join("<br\>")
                        return;
                    }
                    let maxNum = parseFloat(amoun, 10)
                    state.setCategories([{
                        id: Math.random(),
                        name: document.getElementById("category").value,
                        max: maxNum
                    }, ...existingVal])

                }}>Submit</Button>
            </Form>
            <table style={{ width: "60%", margin: "auto", marginTop: "10%" }}>
                <tbody>
                    <tr>
                        <th>Category</th>
                        <th>Max</th>
                        <th></th>
                    </tr>
                    {existingCat}
                </tbody>
            </table>
        </div>
    );
}

export default Categories;
