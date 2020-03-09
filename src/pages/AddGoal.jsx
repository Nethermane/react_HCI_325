import React from "react";

class AddGoal extends React.Component {
  constructor() {
    super();

    this.state = {
      goals: [{ label: "New Phone", amount: "10", frequency: "monthly" }, { label: "A car", amount: "50", frequency: "weekly" }]
    };
  }
  removeGoal(goal, index) {
    var newState = this.state;
    newState.goals.splice(index, 1);
    this.setState(newState)
  }
  addGoal(goal) {
    var newState = this.state;
    newState.goals.add(goal);
    this.setState(newState)
  }
  render() {
    let existingGoals = this.state.goals.map((goal, index) =>
      <tr>
        <td>{goal.label}</td>
        <td>${goal.amount}/{goal.frequency}</td>
        <td><button onClick={() => this.removeGoal(goal,index)}>&#10060;</button></td>
      </tr >
    )
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <form style={{ margin: "auto", marginTop: "10%" }}>
          <div style={{ display: "inline-block" }}>
            <label>
              I want to set aside $
        <input type="text" name="amount" size="5" placeholder="5" />
              &nbsp;each&nbsp;
        <select>
                <option value="day">day</option>
                <option value="week">week</option>
                <option value="month">month</option>
                <option value="year">year</option>
              </select>
              &nbsp;for&nbsp;
      <input type="text" name="amount" size="10" placeholder="college" />
            </label>
          </div>
          <br />
          <input type="submit" value="Save"></input>
        </form>
        <table style={{ width: "60%", margin: "auto", marginTop: "10%" }}>
          <tbody>
            <tr>
              <th>Label</th>
              <th>Amount</th>
              <th></th>
            </tr>
            {existingGoals}
          </tbody>
        </table>

      </div>)
  }
}

export default AddGoal;
