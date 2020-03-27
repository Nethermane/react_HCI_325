import React, { Fragment } from "react";
import InfoForm from "../components/InfoForm";
import "./CashFlow.css";
import useGlobalState from "../UseGlobalState";
import { Container, Col, Row } from "react-bootstrap";

function CashFlow() {
  const state = useGlobalState();
  var goalsHtml = [];
  var incomesHtml = [];
  var expensesHtml = [];

  var existingGoals = [];
  var existingIncomes = [];
  var existingExpenses = [];

  // for (var g in state.goals) {
  //   existingGoals.push(state.goals[g]);
  //   goalsHtml.push(
  //     <InfoForm
  //       key={state.goals[g].id}
  //       data={state.goals[g]}
  //       existingVals={existingGoals}
  //       type="goal"
  //     />
  //   );
  // }

  for (var i in state.incomes) {
    existingIncomes.push(state.incomes[i]);
    incomesHtml.push(
      <InfoForm
        key={state.incomes[i].id}
        data={state.incomes[i]}
        existingVals={existingIncomes}
        type="income"
      />
    );
  }

  for (var e in state.expenses) {
    existingExpenses.push(state.expenses[e]);
    expensesHtml.push(
      <InfoForm
        key={state.expenses[e].id}
        data={state.expenses[e]}
        existingVals={existingExpenses}
        type="expense"
      />
    );
  }

  return (
    <div className="cashflows">
      {/* <div className="goals">
        <p>Goals</p>
        {goalsHtml}
        {existingGoals.length == 0 && <div>go add some goals!</div>}
      </div> */}
      <div className="re-income">
        <p>Recuring Income</p>
        {incomesHtml}
        {existingIncomes.length == 0 && <div>go set up your incomes!</div>}
      </div>
      <div className="re-expense">
        <p>Recuring Expenses</p>
        {expensesHtml}
        {existingExpenses.length == 0 && <div>go set up your expenses!</div>}
      </div>
    </div>
  );
}

export default CashFlow;
