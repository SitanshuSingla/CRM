import { useEffect, useState } from "react";
import "./DashBoard.css";

export default function DashBoard(props) {
  return (
    <div className="row r">
      <div className="col-3 a1">Total - {props.customers.length}</div>
      <div className="col-3 a2">New - {props.new1}</div>
      <div className="col-3 a3">Accepted - {props.accepted}</div>
      <div className="col-3 a4">Rejected - {props.rejected}</div>
    </div>
  );
}
