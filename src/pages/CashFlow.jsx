import React, { Fragment } from "react";
import InfoForm from "../components/InfoForm";
import "./CashFlow.css";
import useGlobalState from "../UseGlobalState";
import { Container, Col, Row } from "react-bootstrap";

var today = new Date();
var current_year = today.getFullYear();
var current_month = today.getMonth() + 1;
//first day of the month
var firstDay = new Date(current_year, current_month - 1, 1).toLocaleString();
//last dat of the month
var lastDay = new Date(current_year, current_month, 0).toLocaleString();

function CashFlow() {
  const state = useGlobalState();
  var incomesHtml = [];
  var expensesHtml = [];
  var existingIncomes = [];
  var existingExpenses = [];

  for (var i in state.incomes) {
    existingIncomes.push(state.incomes[i]);
    if (state.incomes[i].frequency != "onetime") {
      incomesHtml.push(
        <InfoForm
          key={state.incomes[i].id}
          data={state.incomes[i]}
          existingVals={existingIncomes}
          type="income"
        />
      );
    }
  }

  for (var e in state.expenses) {
    existingExpenses.push(state.expenses[e]);
    if (state.expenses[e].frequency != "onetime") {
      expensesHtml.push(
        <InfoForm
          key={state.expenses[e].id}
          data={state.expenses[e]}
          existingVals={existingExpenses}
          type="expense"
        />
      );
    }
  }

  var total_incomes = getSum(state.incomes);
  var total_expenses = getSum(state.expenses);
  var total_balance = total_incomes - total_expenses;
  return (
    <div className="cashflows">
      <div className="summary">
        <AmountDisplayCard name="incomes" total_amount={total_incomes} />
        <AmountDisplayCard name="expenses" total_amount={total_expenses} />
        <AmountDisplayCard name="balance" total_amount={total_balance} />
      </div>
      <div className="re-income">
        <p>Recuring Income +</p>
        {incomesHtml}
        {existingIncomes.length == 0 && <div>go set up your incomes!</div>}
      </div>
      <div className="re-expense">
        <p>Recuring Expenses -</p>
        {expensesHtml}
        {existingExpenses.length == 0 && <div>go set up your expenses!</div>}
      </div>
    </div>
  );
}

function getSum(data_getsum) {
  var total_amount = 0;
  for (var e in data_getsum) {
    var frequency = data_getsum[e].frequency;
    var amount = parseInt(data_getsum[e].amount);
    var date = data_getsum[e].date;
    var year = parseInt(date.slice(0, 4));
    var month = parseInt(date.slice(5, 7));
    if (frequency == "monthly") {
      total_amount +=
        amount * (12 * (current_year - year) - month + 1 + current_month);
    } else if (frequency == "weekly") {
      total_amount +=
        amount * 4 * (12 * (current_year - year) - month + 1 + current_month);
    } else if (frequency == "yearly") {
      total_amount += (current_year - year + 1) * amount;
    } else {
      // if (date <= firstDay && date >= lastDay) {
      total_amount += amount;
      // }
    }
  }
  return total_amount;
}

class AmountDisplayCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.name}>
        <Col>
          <Row>
            <span>${this.props.total_amount}</span>
          </Row>
          <Row>
            <h3>Total {this.props.name}</h3>
          </Row>
        </Col>
      </div>
    );
  }
}

export default CashFlow;
