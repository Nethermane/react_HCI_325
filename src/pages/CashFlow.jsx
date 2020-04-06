import React, { Fragment } from "react";
import InfoForm from "../components/InfoForm";
import "./CashFlow.css";
import useGlobalState from "../UseGlobalState";
import { Container, Col, Row } from "react-bootstrap";

function CashFlow() {
  const state = useGlobalState();
  var incomesHtml = [];
  var expensesHtml = [];
  var existingIncomes = [];
  var existingExpenses = [];

  for (var i in state.incomes) {
    existingIncomes.push(state.incomes[i]);
    var today = new Date();
    var current_year = today.getFullYear();
    var current_month = today.getMonth() + 1;
    var current_day = today.getDate();
    var current = current_year + "-" + current_month + "-" + current_day;
    if (
      state.incomes[i].frequency != "onetime" &&
      state.incomes[i].end_date > current
    ) {
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
    var today = new Date();
    var current_year = today.getFullYear();
    var current_month = today.getMonth() + 1;
    var current_day = today.getDate();
    var current = current_year + "-" + current_month + "-" + current_day;
    if (
      state.expenses[e].frequency != "onetime" &&
      state.expenses[e].end_date > current
    ) {
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
        <p>Recuring Incomes +</p>
        {incomesHtml}
        {incomesHtml.length == 0 && <div>go set up your incomes!</div>}
      </div>
      <div className="re-expense">
        <p>Recuring Expenses -</p>
        {expensesHtml}
        {expensesHtml.length == 0 && <div>go set up your expenses!</div>}
      </div>
    </div>
  );
}

function getSum(list) {
  var total_amount = 0;
  var today = new Date();
  var gs_current_year = today.getFullYear();
  var gs_current_month = today.getMonth() + 1;
  var gs_current_day = today.getDate();
  var gs_current =
    gs_current_year + "-" + gs_current_month + "-" + gs_current_day;
  for (var e in list) {
    var frequency = list[e].frequency;
    var amount = parseInt(list[e].amount);
    var date = list[e].date;
    var year = parseInt(date.slice(0, 4));
    var month = parseInt(date.slice(5, 7));
    var end_date = list[e].end_date;
    if (frequency == "monthly") {
      if (end_date > gs_current) {
        total_amount +=
          amount *
          (12 * (gs_current_year - year) - month + 1 + gs_current_month);
      } else {
        total_amount +=
          amount *
          (12 * (parseInt(end_date.slice(0, 4)) - year) -
            month +
            parseInt(end_date.slice(5, 7)));
      }
    } else if (frequency == "weekly") {
      if (end_date > gs_current) {
        total_amount +=
          amount *
          4 *
          (12 * (gs_current_year - year) - month + 1 + gs_current_month);
      } else {
        total_amount +=
          amount *
          4 *
          (12 * (parseInt(end_date.slice(0, 4)) - year) -
            month +
            parseInt(end_date.slice(5, 7)));
      }
    } else if (frequency == "yearly") {
      if (end_date > gs_current) {
        total_amount += (gs_current_year - year + 1) * amount;
      } else {
        total_amount += (parseInt(end_date.slice(0, 4)) - year) * amount;
      }
    } else {
      total_amount += amount;
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
