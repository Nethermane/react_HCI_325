import React from "react";
import "./InfoForm.css";

function InfoForm(props) {
  return (
    <div className="info">
      <div className="type">{props.type}</div>
      <div className="amount"> ${props.amount} </div>
    </div>
  );
}

export default InfoForm;
