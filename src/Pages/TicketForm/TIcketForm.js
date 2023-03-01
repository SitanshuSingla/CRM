import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Dropdown } from "primereact/dropdown";

export default function TicketForm() {
  let [ticketForm, setTicketForm] = useState([]);
  let [user, setUser] = useState([]);
  let [customer, setCustomer] = useState([]);
  let [check, setCheck] = useState(false);
  let navigate = useNavigate();
  let { desc } = useParams();

  function handleticketsubmit() {
    if (
      !ticketForm.customer ||
      !ticketForm.status ||
      !ticketForm.desc ||
      !ticketForm.assignedTo ||
      !ticketForm.raisedOn
    ) {
      setCheck(true);
    } else {
      fetch((process.env.REACT_APP_APIURL = "ticket"), {
        method: desc ? "PUT" : "POST",
        body: JSON.stringify(ticketForm),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        res.json();
        navigate("/ticket");
      });
    }
  }

  // for edit button

  // for dorpdown of customer name and assignee name
  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "user")
      .then((res) => res.json())
      .then((res) => setUser(res));

    fetch(process.env.REACT_APP_APIURL + "customer")
      .then((res) => res.json())
      .then((res) => setCustomer(res));

    if (desc) {
      fetch(process.env.REACT_APP_APIURL + "ticket/" + desc)
        .then((res) => res.json())
        .then((res) => {
          setTicketForm(res);
        });
    }
  }, []);

  return (
    <div>
      <div className="container">
        <div className="mb-3">
          {check && (
            <div className="alert alert-danger" role="alert">
              Enter all Fields
            </div>
          )}

          <label htmlFor="exampleFormControlInput1" className="form-label">
            Customer
          </label>

          <Dropdown
            disabled={desc}
            value={customer.find((s) => s.name == ticketForm.customer)}
            onChange={(e) => {
              let obj = { ...ticketForm };
              obj.customer = e.value.name;
              setTicketForm(obj);
            }}
            options={customer}
            optionLabel="name"
            placeholder="Select a Customer"
            filter
            className="w-full "
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Description
          </label>
          <input
            value={ticketForm.desc}
            onInput={(e) => {
              let obj = { ...ticketForm };
              obj.desc = e.target.value;
              setTicketForm(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Status
          </label>
          <select
            value={ticketForm.status}
            onChange={(e) => {
              let obj = { ...ticketForm };
              obj.status = e.target.value;
              setTicketForm(obj);
            }}
            className="form-select"
          >
            <option value="In Progress">In Progress</option>
            <option value="Assigned">Assigned</option>
            <option value="New">New</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Assigned To
          </label>
          <select
            value={ticketForm.assignedTo}
            onChange={(e) => {
              let obj = { ...ticketForm };
              obj.assignedTo = e.target.value;
              setTicketForm(obj);
            }}
            className="form-select"
          >
            {user.map((i) => {
              return <option value={i.name}>{i.name}</option>;
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Raised On
          </label>
          <input
            disabled={desc ? true : false}
            value={ticketForm.raisedOn}
            onInput={(e) => {
              let obj = { ...ticketForm };
              obj.raisedOn = e.target.value;
              setTicketForm(obj);
            }}
            type="date"
            className="form-control"
          ></input>
        </div>

        {
          <button
            onClick={handleticketsubmit}
            className="btn btn-primary float-end"
            type="button"
          >
            {!desc ? (
              <span> Create New Ticket</span>
            ) : (
              <span> Update Ticket</span>
            )}
          </button>
        }
      </div>
    </div>
  );
}
