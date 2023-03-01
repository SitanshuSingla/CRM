import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import TicketDashboard from "../../Components/TicketDashboard/TicketDashboard";
import "./Ticket.css";

export default function Ticket() {
  let [ticket, setTicket] = useState([]);
  let [search, setSearch] = useState("");
  let [count, setCount] = useState({});
  const [visible, setVisible] = useState(false); // for side bar
  let navigate = useNavigate();
  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "ticket")
      .then((res) => res.json())
      .then((res) => {
        setTicket(res);
        let obj = {};
        obj.all = res.length;
        obj.progress = res.filter((s) => s.status == "In Progress").length;
        obj.assign = res.filter((s) => s.status == "Assigned").length;
        obj.resolved = res.filter((s) => s.status == "Resolved").length;
        obj.new = res.filter((s) => s.status == "New").length;

        setCount(obj);
      });
  }, []);

  function handleRaise() {
    navigate("/ticketform");
  }

  function handleEdit(desc) {
    navigate("/ticketform/" + desc);
  }

  return (
    <div className="container mt-3">
      <Navbar />
      <div>
        <button onClick={handleRaise} className="btn btn-success">
          Raise Ticket
        </button>
        <TicketDashboard count={count} />
        <input
          onChange={(e) => {
            if (e.target.value == "") setSearch("*");
            else setSearch(e.target.value);
          }}
          className="form-control float-end me-2 sear"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned To</th>
            <th scope="col">Raised On</th>
          </tr>
        </thead>
        <tbody>
          {ticket &&
            ticket
              .filter((i) => {
                if (search == "*") {
                  return i;
                } else if (
                  i.desc.toLowerCase().includes(search.toLowerCase())
                ) {
                  return i;
                }
              })
              .map((t) => {
                return (
                  <tr>
                    <th scope="row">{t.customer}</th>
                    <td>{t.desc}</td>
                    <td
                      className={
                        t.status == "New"
                          ? "new"
                          : t.status == "Assigned"
                          ? "assigned"
                          : (t.status = "Resolved" ? "resolved" : "inprogress")
                      }
                    >
                      {t.status}
                    </td>
                    <td>{t.assignedTo}</td>
                    <td>{t.raisedOn}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(t.desc)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
