import React from "react";
import { Col, Row } from "react-bootstrap";

function copy(x) {
    return JSON.parse(JSON.stringify(x));
}

export function modifyDate(date, y, m, d) {
    return new Date(date.getFullYear() + y, date.getMonth() + m, date.getDate() + d);
}

export function formatCurrency(amount) {
    if (amount < 0)
        return '- $' + -amount;
    return '+ $' + amount;
}

export function formatDate(date) {
    var fmt = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    };
    return date.toLocaleDateString('en-CA', fmt);
}

export function formatMonth(date) {
    var fmt = {
        year: '2-digit',
        month: 'short'
    };
    return date.toLocaleDateString('en-CA', fmt);
}

export function formatRecord(record) {
    return [
        <Row>
          <Col md={1}></Col>
          <Col md={2}>
            <p class={"lal"}>
                {formatDate(record.date)}
            </p>
          </Col>
          <Col md={3}><p class={"lal"}>{record.name}</p></Col>
          <Col md={2}><p class={"lal"}>{record.category}</p></Col>
          <Col md={2}><p class={"lal"}>{record.frequency}</p></Col>
          <Col md={2}><p class={"lal"}>{formatCurrency(record.amount)}</p></Col>
        </Row>
    ];
}

export function filterAndSortRecords(start_date, end_date, data) {
  
  var records = [];
  
  for (var i in data) {
    var date = modifyDate(new Date(Date.parse(data[i].date)), 0, 0, 1);
    
      if (end_date < date)
        continue;
    
    let year = 0;
    let month = 0;
    let week = 0;
    
    var freq = data[i].frequency;
    
    if (freq == "yearly" || freq == "annually")
        year = 1;
    if (freq == "monthly")
        month = 1
    else if (freq == "weekly")
        week = 7;
    
    do {
      if (start_date <= date) {
        var record = copy(data[i]);
        record.date = date;
        record.info = formatRecord(record);
        records.push(record);
      }
      date = modifyDate(date, year, month, week);
    } while (date <= end_date && freq != "one time")
  }
  
  records.sort((x, y) => { return x.date > y.date });
  return records;
}
