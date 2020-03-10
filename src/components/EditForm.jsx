import React from "react";
import "./EditForm.css";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditForm(props) {
  const handleClick = () => {
    alert("hello");
  };

  return (
    <div className="edit">
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faEraser} />
      </button>
      <div className="type">{props.name}</div>
      <div className="startDate">{props.startDate}</div>
      <div className="frequency">{props.frequency}</div>
      <div className="amount">${props.amount}</div>
    </div>
  );
}

export default EditForm;
