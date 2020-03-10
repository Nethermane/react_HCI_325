import React from "react";
import "./Form.css";

function EditForm(props) {
  return (
    <div className="edit">
      <div className="type">{props.type}</div>
      <div className="date">{props.date}</div>
      <div className="frequency">{props.frequency}</div>
      <div className="amount"> ${props.amount} </div>
    </div>
  );
}

export default EditForm;
