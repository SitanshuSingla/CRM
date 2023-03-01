import "./TicketDashboard.css";

export default function TicketDashboard(props) {
  return (
    <div className="row r">
      <div className="col-2 status-a1">Total -{props.count.all} </div>
      <div className="col-2 status-a2">New - {props.count.new}</div>
      <div className="col-2 status-a3">Resolved - {props.count.resolved}</div>
      <div className="col-2 status-a4">
        In Progress - {props.count.progress}
      </div>
      <div className="col-2 status-a5">Assigned-{props.count.assign}</div>
    </div>
  );
}
