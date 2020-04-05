import React from "react";
import Chart from "chart.js";
import { Container, Row, Col } from "react-bootstrap";
import useGlobalState from "../UseGlobalState";
import StatusBar from "../components/StatusBar";
import { filterAndSortRecords } from "../Helpers";

import "./Home.css";

let pallette = [ '#6202EE', '#0218EE', '#028EEE', '#D802EE', '#ee028e' ];


function mangle(categories, input_data, setMissingToOther) {
  var today = new Date();

  var first_day_of_month = new Date(
    today.getFullYear(), today.getMonth(), 1);

  var last_day_of_month = new Date(
    today.getFullYear(), today.getMonth() + 1, 0);

  var data = filterAndSortRecords(first_day_of_month, last_day_of_month, input_data);
  console.log(data)

  for (var i in data) {
      if (!(data[i].category in categories)) {
        if (typeof data[i].category === 'undefined' || setMissingToOther)
          data[i].category = 'Other';
        
        if (!(data[i].category in categories)) {
          categories[data[i].category] = {
            max: undefined,
            amount: 0
          }
        }
      }
      
      categories[data[i].category].amount += parseInt(data[i].amount);
  }

  for (var c in categories) {
    if (typeof categories[c].max === "undefined") {
      categories[c].max = categories[c].amount;
    }
  }

  return categories;
}


class Category extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    var bgcolor = "bg-purple-faded";
    var fgcolor = "bg-purple";

    var spent = this.props.spent * 1;

    if (this.props.budget * 1 < spent) {
      spent -= this.props.budget * 1;
      bgcolor = "bg-purple";
      fgcolor = "bg-yellow";
    }

    var percentage = Math.ceil((spent / this.props.budget) * 100);

    return (
      <Container>
        <Row>
          <Col>
            <h3 class="category-name">{this.props.name}</h3>
          </Col>
          <Col>
            <h3 class="category-value">
              {this.props.spent}$ / {this.props.budget}$
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div class={"progress " + bgcolor}>
              <div
                ref={this.ref}
                class={"progress-bar " + fgcolor}
                role="progressbar"
                style={{ width: percentage + "%" }}
              ></div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() { }
}

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.ctx = React.createRef();
  }

  render() {
    return <canvas ref={this.ctx} />;
  }

  componentDidMount() {
    //let purple = ["#6202EE", "#BC94F8", "#D9C2FB"]
    var labels = [];
    var colors = [];
    var data = [];
    
    for (var i in this.props.data) {
        if (this.props.data[i].amount == 0 || i == "Other")
            continue
        
        labels.push(i);
        data.push(this.props.data[i].amount);
        //colors.push('rgba(99, 2, 238,' + (1 - (colors.length * 0.2)) + ')');
		colors.push(pallette[colors.length%pallette.length]);
    }
    
    if ("Other" in this.props.data) {
        labels.push(i);
        data.push(this.props.data[i].amount);
        //colors.push('rgba(99, 2, 238,' + (1 - (colors.length * 0.2)) + ')');
		colors.push(pallette[colors.length%pallette.length]);
    }
    
    new Chart(this.ctx.current, {
      type: "pie",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: colors
          }
        ],
        labels: labels
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        aspectRatio: 1.8,
        legend: {
          position: "bottom"
        },
        tooltips: {
          enabled: true,
          callbacks: {label:(i, data) => labels[i.index] + ': $'+data.datasets[0].data[i.index]}
        }
      }
    });
  }
}


function formatCategory(categories, c) {
    return (
      <div>
        <div class="spacer" />
        <Category name={c} spent={categories[c].amount} budget={categories[c].max} />
      </div>
    );
}


function Home(props) {
  const state = JSON.parse(JSON.stringify(useGlobalState()));

  var expense_categories = {};
  var income_categories = {};

  for (var c in state.categories) {
    expense_categories[state.categories[c].name] = {
      max: state.categories[c].max,
      amount: 0
    };
  }

  expense_categories = mangle(expense_categories, state.expenses, true);
  income_categories = mangle(income_categories, state.incomes, false);

  var category_html = [];
  for (var c in expense_categories) {
    if (c == "undefined" || c == "Other")
      continue;

    category_html.push(formatCategory(expense_categories, c));
  }
  
  if ("Other" in expense_categories) {
    category_html.push(formatCategory(expense_categories, "Other"));
  }

  return (
    <div style={{marginTop:"10px"}}>
      {props.location.state && props.location.state.success ? <StatusBar></StatusBar> : null}
      <div class="vcenter">
        <Container fluid>
          <Row>
            <Col md={5}>
              <h2 class="fg-purple cal">Expenses</h2>
              <Pie data={expense_categories}/>
              <div class="spacer" />
              <h2 class="fg-purple cal">Incomes</h2>
              <Pie data={income_categories}/>
            </Col>
            <Col md={6}>
              <h2 class="fg-purple">Spending</h2>
              {category_html}
            </Col>
            <Col md={1}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
