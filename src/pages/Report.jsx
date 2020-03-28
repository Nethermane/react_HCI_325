import React from "react";
import "./CashFlow.css";
import "./Report.css";
import useGlobalState from "../UseGlobalState";
import CanvasJSReact from '../canvasjs.react.js';
import { Accordion, Card, Table, Container, Col, Row } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class ReportTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.collapse = new Array(this.props.months.length);
        this.cards = [];
        for (var i in props.months) {
          var card = [
              <SubTable callback={this.update} index={i} data={props.months[i]} subcards={props.months[i].records} register={this.register}>
              </SubTable>
          ];
          this.cards.push(card);
        }
        this.cards.reverse();
    }
    
    update = (index) => {
        for (var i in this.collapse) {
          if (i != index)
            this.collapse[i]();
        }
    }
    
    register = (index, collapse) => {
      this.collapse[index] = collapse;
    }
    
    render() {
      return (
        <Container>
        <Container>
          <Row>
            <Col md={6}></Col>
            <Col md={2}><h5 class={'lal'}>Income</h5></Col>
            <Col md={2}><h5 class={'lal'}>Expenses</h5></Col>
            <Col md={2}><h5 class={'lal'}>Net</h5></Col>
          </Row>
        </Container>
        <Card>
          <Accordion>
            {this.cards}
          </Accordion>
        </Card>
        </Container>
      );
    }
}

class SubTable extends React.Component {
    state = { open: false }
    constructor(props) {
        super(props);
        props.register(props.index, this.collapse);
    }
    
    toggle = () => {
      this.props.callback(this.props.index);
      this.setState((state) => {
        return { open: !state.open };
      });
    }
    
    collapse = () => {
      this.setState({ open: false });
    }
    
    render() {
      var index = this.props.index;
      var data = this.props.data;
      var subcards = this.props.subcards;
      
      var body = [
          <p class={'cal'}>There are no records for this period</p>
      ];
      
      if (subcards.length != 0) {
        body = [
          <Container>
            <Row>
              <Col md={1}></Col>
              <Col md={2}><p class={'lal'}><b>Date</b></p></Col>
              <Col md={3}><p class={'lal'}><b>Item</b></p></Col>
              <Col md={2}><p class={'lal'}><b>Category</b></p></Col>
              <Col md={2}><p class={'lal'}><b>Frequency</b></p></Col>
              <Col md={2}><p class={'lal'}><b>Amount</b></p></Col>
            </Row>
            {subcards}
          </Container>
        ];
      }
      
      return (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={index} onClick={this.toggle}> 
            <Container>
              <Row>
                <Col md={1}><FontAwesomeIcon icon={this.state.open?faAngleDown:faAngleRight} className={'left'}> </FontAwesomeIcon></Col>
                <Col md={5}><p class={'lal'}><b>{data.label}</b></p></Col>
                <Col md={2}><p class={'lal'}><b>{formatCurrency(data.income)}</b></p></Col>
                <Col md={2}><p class={'lal'}><b>{formatCurrency(data.expense)}</b></p></Col>
                <Col md={2}><p class={'lal'}><b>{formatCurrency(data.net)}</b></p></Col>
              </Row>
            </Container>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index}>
            <Card.Body>
              {body}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    }
}


function formatCurrency(amount) {
    if (amount < 0)
        return '- $' + -amount;
    return '+ $' + amount;
}

function formatDate(date) {
    var fmt = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    };
    return date.toLocaleDateString('en-CA', fmt);
}

function formatMonth(date) {
    var fmt = {
        year: '2-digit',
        month: 'short'
    };
    return date.toLocaleDateString('en-CA', fmt);
}


function filterAndSortByDate(data) {
  var items = [];
 
  var today = new Date();
  var last_year = new Date();
  last_year.setFullYear(today.getFullYear() - 1);
  
  for (var i in data) {
    var date = new Date(Date.parse(data[i].date));
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Pretend everything is monthly for now
    var last = new Date(date);
    last.setMonth(last.getMonth() + parseInt(data[i].duration));
    
    if (last_year < last) {
      items.push(data[i]);
      items[i].date = date;
      items[i].last = last;
      items[i].info = [
        <Row>
          <Col md={1}></Col>
          <Col md={2}>
            <p class={"lal"}>
                {formatDate(items[i].date)}
            </p>
          </Col>
          <Col md={3}><p class={"lal"}>{items[i].name}</p></Col>
          <Col md={2}><p class={"lal"}>{items[i].category}</p></Col>
          <Col md={2}><p class={"lal"}>{items[i].frequency}</p></Col>
          <Col md={2}><p class={"lal"}>{formatCurrency(items[i].amount)}</p></Col>
        </Row>
      ];
    }
  }

  items.sort((x, y) => { return x.date > y.date });
  return items;
}

function Report() {
  const state = JSON.parse(JSON.stringify(useGlobalState()));
  var today = new Date();
  var incomes = state.incomes;
  var expenses = state.expenses;
  var records = []

  for (var e in expenses) {
    expenses[e].amount = -expenses[e].amount;
    records.push(expenses[e]);
  }
  
  for (var i in incomes) {
    records.push(incomes[i]);
  }
    
  records = filterAndSortByDate(records);
  
  var today = new Date();
  var month = today.getMonth();

  var month_inc = new Array(25);
  var month_exp = new Array(25);
  var month_net = new Array(25);

  var month_incomes = new Array(25);
  var month_data = new Array(25);
  var month_cards = new Array(25);

  
  for (var m = 0; m < 25; m++) {
    var offset = m - 12;
	
    var first_day_of_month = new Date (
        today.getFullYear(), month + offset, 1);
    
    var last_day_of_month = new Date (
        today.getFullYear(), month + (offset+1), 0);
    
    var index = m;
    var label = formatMonth(first_day_of_month);
    
    month_data[index] = {
        label: label,
        income: 0,
        expense: 0,
        net: 0,
    };
    
    var monthly_records = [];
    
    for (var c in records) {
      if (first_day_of_month >= records[c].date
          && last_day_of_month <= records[c].last) {
        
        var amount = parseInt(records[c].amount);
        
        if (amount < 0) {
            month_data[index].expense += amount;
        }
        else {
            month_data[index].income += amount;
        }
        
        monthly_records.push(records[c].info);
      }
    }
    
    month_data[index].records = monthly_records;
    month_data[index].net = month_data[index].income + month_data[index].expense;
    
    if (monthly_records.length == 0) {
      month_inc[index] = { label: label, y: undefined };
      month_exp[index] = { label: label, y: undefined };
      month_net[index] = { label: label, y: undefined };
    }
    else {
      month_inc[index] = { label: label, y: month_data[index].income };
      month_exp[index] = { label: label, y: -month_data[index].expense };
      month_net[index] = { label: label, y: month_data[index].net };
    }

  }
  
  var options = {
    //axisX: { interval: 1, labelAngle: 140 },
    axisX: { interval: 2 },
    axisY: { prefix: "$" },
    data: [{
      type: "spline",
      color: "black",
      showInLegend: true,
      legendText: "Net",
      dataPoints: month_net
    },{
      type: "spline",
      color: "#4F81BC",
      showInLegend: true,
      legendText: "Income",
      dataPoints: month_inc
    },{
      type: "spline",
      color: "#C0504E",
      showInLegend: true,
      legendText: "Expenses",
      dataPoints: month_exp
    }]
  }
  
  return (
    <div>
      <div style={{'height': '4vh'}}/>
      <h1 style={{"text-align": "center"}}>Monthly Reports</h1>
      <div style={{'height': '4vh'}}/>
      <Container>
        <CanvasJSChart options={options}/>
      </Container>
      <div style={{'height': '8vh'}}/>
      <ReportTable months={month_data.slice(0, 13)}></ReportTable>
      <div style={{'height': '8vh'}}/>
      <h2 style={{"text-align": "center"}}>Projected</h2>
      <div style={{'height': '2vh'}}/>
      <ReportTable months={month_data.slice(13,25).reverse()}></ReportTable>
    </div>
  );
}

export default Report;
