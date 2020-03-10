import React from "react";
import useGlobalState from "../UseGlobalState";
import InfoForm from "../components/InfoForm";


function Categories() {
    const state = useGlobalState();
    let categories_table =<p></p>
    console.log(state)
    return (
        <table style={{ width: "60%", margin: "auto", marginTop: "10%" }}>
            <tbody>
                <tr>
                    <th>Goal</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
                {/* {existingGoals} */}
            </tbody>
        </table>
    );
}

export default Categories;
