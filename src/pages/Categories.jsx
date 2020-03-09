import React from "react";

function Categories() {
    // let existingGoals = this.state.goals.map((goal, index) =>
    //     <tr>
    //         <td>la</td>
    //         <td>a</td>
    //         <td></td>
    //     </tr >
    // )
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
