import React from "react";
import Chart from "chart.js";
import { Container, Row, Col } from "react-bootstrap";
import useGlobalState from "../UseGlobalState";
import StatusBar from "../components/StatusBar";

import "./Home.css";


function mangle(categories, data) {
  var today = new Date();

  var first_day_of_month = new Date(
    today.getFullYear(), today.getMonth(), 1);

  var last_day_of_month = new Date(
    today.getFullYear(), today.getMonth() + 1, 0);

  for (var i in data) {
    var date = new Date(Date.parse(data[i].date));
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Pretend everything is monthly for now
    var last = new Date(date.getFullYear(), date.getMonth() + parseInt(data[i].duration), date.getDate());

    if (first_day_of_month >= date
      && last_day_of_month <= last) {

      console.log(data[i].category)
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
            <Col md={5}>
              <Pie />
            </Col>
            <Col md={6}>
              <h2 class="fg-purple">This Month</h2>
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
