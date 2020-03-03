import React from "react";
import Chart from "chart.js";
import { Container, Row, Col } from "react-bootstrap";

import "./Home.css";

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

  componentDidMount() {}
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

function Home() {
  return (
    <div class="vcenter">
      <Container fluid>
        <Row>
          <Col md={5}>
            <Pie />
          </Col>
          <Col md={6}>
            <h2 class="fg-purple">This Week</h2>
            <div class="spacer" />
            <Category name="Food" spent="50" budget="150" />
            <div class="spacer" />
            <Category name="Coffee" spent="20" budget="40" />
            <div class="spacer" />
            <Category name="Overspending Addiction" spent="500" budget="300" />
            <div class="spacer" />
            <Category name="Retail Therapy" spent="4000" budget="40" />
            <div class="spacer" />
            <Category name="Actual Therapy" spent="0" budget="2" />
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
