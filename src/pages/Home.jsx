import React from "react";
import Chart from "chart.js";
import { Container, Row, Col } from "react-bootstrap";
import useGlobalState from "../UseGlobalState";
import StatusBar from "../components/StatusBar";
import { filterAndSortRecords } from "../Helpers";

import "./Home.css";


function mangle(categories, input_data) {
  var today = new Date();

  var first_day_of_month = new Date(
    today.getFullYear(), today.getMonth(), 1);

  var last_day_of_month = new Date(
    today.getFullYear(), today.getMonth() + 1, 0);

  var data = filterAndSortRecords(first_day_of_month, last_day_of_month, input_data);
  console.log(data)

  for (var i in data) {
      if (!(data[i].category in categories)) {
        categories[data[i].category] = {
          max: undefined,
          amount: parseInt(data[i].amount)
        }
      }
      else {
        categories[data[i].category].amount += parseInt(data[i].amount);
      }
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
    new Chart(this.ctx.current, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [1, 2, 3],
            backgroundColor: ["#6202EE", "#BC94F8", "#D9C2FB"]
          }
        ],
        labels: ["Spent", "Allocated", "Unallocated"]
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        aspectRatio: 1.5,
        legend: {
          position: "bottom"
        }
      }
    });
  }
}

function Home(props) {
  const state = JSON.parse(JSON.stringify(useGlobalState()));

  var categories = {};

  for (var c in state.categories) {
    categories[state.categories[c].name] = {
      max: state.categories[c].max,
      amount: 0
    };
  }

  categories = mangle(categories, state.expenses);

  var category_html = [];
  for (var c in categories) {
    if (c == "undefined")
      continue;

    category_html.push(
      <div>
        <div class="spacer" />
        <Category name={c} spent={categories[c].amount} budget={categories[c].max} />
      </div>
    );
  }
  return (
    <div style={{marginTop:"10px"}}>
      {props.location.state && props.location.state.success ? <StatusBar></StatusBar> : null}
      <div class="vcenter">
        <Container fluid>
          <Row>
            <Col md={6}>
              <h2 class="fg-purple">Expenses</h2>
              <Pie />
            </Col>
            <Col md={6}>
              <h2 class="fg-purple">Expenses</h2>
              <Pie />
            </Col>
            <Col md={1}></Col>
          </Row>
          <Row>
            <Col>
            <h2 class="fg-purple">Spending</h2>
            {category_html}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
