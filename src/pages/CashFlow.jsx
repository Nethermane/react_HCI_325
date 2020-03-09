import React from "react";
import InfoForm from "../components/InfoForm";
import "./CashFlow.css";
import useGlobalState from "../UseGlobalState";

function CashFlow() {
  const state = useGlobalState();
  var accountsHtml = [];
  var incomesHtml = [];
  var expensesHtml = [];

  for (var a in state.accounts) {
    accountsHtml.push(
      <InfoForm
        type={state.accounts[a].name}
        amount={state.accounts[a].amount}
      />
    );
  }

  for (var i in state.incomes) {
    incomesHtml.push(
      <InfoForm type={state.incomes[i].name} amount={state.incomes[i].amount} />
    );
  }

  for (var e in state.expenses) {
    expensesHtml.push(
      <InfoForm
        type={state.expenses[e].name}
        amount={state.expenses[e].amount}
      />
    );
  }

  return (
    <div className="cashflows">
      <div className="accounts">
        <h>Accounts</h>
        {accountsHtml}
      </div>
      <div className="re-income">
        <h>Reoccuring Income</h>
        {incomesHtml}
      </div>
      <div className="re-expense">
        <h>Reoccuring Expenses</h>
        {expensesHtml}
      </div>
    </div>
  );
}

export default CashFlow;
