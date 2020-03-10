import React from "react";
import useGlobalState from "../UseGlobalState";
import InfoForm from "../components/InfoForm";
import { Button, Form, Dropdown } from "react-bootstrap";

function Categories() {
    const state = useGlobalState()
    var existingCat = []
    var i = 0;
    var existingVal = []
    while (i in state.categories) {
        existingVal.push({ id: state.categories[i].id, name: state.categories[i].name, max: state.categories[i].max })
        existingCat.push(
            <tr>
                <td>{state.categories[i].name}</td>
                <td>${state.categories[i].max}</td>
                <td><button onClick={() => {
                    var temp = existingVal.filter(e => e.id != existingVal[i - 1].id)
                    state.setCategories(temp)
                }
                }>&#10060;</button></td>
            </tr>
        )
        i++;
    }
    console.log(state)
    return (
        <div>
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
                    state.setCategories([{
                        id: Math.random(),
                        name: document.getElementById("category").value,
                        max: document.getElementById("max").value
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
