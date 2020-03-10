import React from "react";
import "./CashFlow.css";
import useGlobalState from "../UseGlobalState";
import CanvasJSReact from '../canvasjs.react.js';
import { Accordion, Card, Table, Container, Col, Row } from "react-bootstrap";

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function FilterAndSortByDate(data) {
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
          <Col>
            {items[i].date.getFullYear()}-
            {items[i].date.getMonth()}-
            {items[i].date.getDate()}
          </Col>
          <Col>{items[i].name}</Col>
          <Col>{items[i].category}</Col>
          <Col>{items[i].amount}</Col>
        </Row>
      ];
    }
  }

  items.sort((x, y) => { return x.date > y.date });
  return items;
}

function Report() {
  const state = useGlobalState();
  var today = new Date();
  
  var incomes = state.incomes;
  var expenses = state.expenses;
  var combined = []

  for (var e in expenses) {
    expenses[e].amount = -expenses[e].amount;
    combined.push(expenses[e]);
  }
  
  for (var i in incomes) {
    combined.push(incomes[i]);
  }
    
  combined = FilterAndSortByDate(combined);
  
  var today = new Date();
  var month_data = new Array(12);
  var month_cards = new Array(12);
  
  for (var m = 0; m < 12; m++) {
    var month_was_last_year = (today.getMonth() <= m);
    
    var first_day_of_month = new Date (
        today.getFullYear() - (month_was_last_year?1:0), m, 1);
    
    var last_day_of_month = new Date (
        today.getFullYear() - (month_was_last_year?1:0), m+1, 0);
    
    var index = (m + (12 - today.getMonth())) % 12;
    var label = today.getFullYear() - (month_was_last_year?1:0) + ' - ' + (m+1);
    
    month_data[index] = {
        label: label,
        income: 0,
        expense: 0,
        y: 0
    };
    
    var monthly_combined = [];
    
    for (var c in combined) {
      if (first_day_of_month >= combined[c].date
          && last_day_of_month <= combined[c].last) {
        
        var amount = parseInt(combined[c].amount);
        
        if (amount < 0) {
            month_data[index].expense += amount;
        }
        else {
            month_data[index].income += amount;
        }
        
        monthly_combined.push(combined[c].info);
      }
    }
    
    month_data[index].y = month_data[index].income + month_data[index].expense;
    
    month_cards[index] = [
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={index}> 
          <Container>
            <Row>
              <Col><b>{month_data[index].label}</b></Col>
              <Col><b>{month_data[index].income}</b></Col>
              <Col><b>{month_data[index].expense}</b></Col>
              <Col><b>{month_data[index].y}</b></Col>
            </Row>
          </Container>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
          <Card.Body>
            <Container>
              <Row>
                <Col><b>Date</b></Col>
                <Col><b>Item</b></Col>
                <Col><b>Category</b></Col>
                <Col><b>Amount</b></Col>
              </Row>
              {monthly_combined}
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ];
  }
  
  var options = {
    title: {
      text: "Monthly Spending"
    },
    data: [{
      type: "line",
      dataPoints: month_data
    }]
  }

  month_cards.reverse();
  return (
    <div>
      <CanvasJSChart options={options}
      /* onRef = {ref => this.chart = ref} */
      />
      <div style={{'height': '2vh'}}/>
      <Container>
        <Row>
          <Col><h2 style={{'text-align': 'center'}}>Month</h2></Col>
          <Col><h2 style={{'text-align': 'center'}}>Income</h2></Col>
          <Col><h2 style={{'text-align': 'center'}}>Expenses</h2></Col>
          <Col><h2 style={{'text-align': 'center'}}>Net</h2></Col>
        </Row>
        <div style={{'height': '2vh'}}/>
      </Container>
      <Accordion>
        {month_cards}
      </Accordion>
    </div>
  );
}

export default Report;
