import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CustomerForm() {
  const [customer, setCustomer] = useState({});
  // useParams allows access to route parameters.
  let navigate = useNavigate();
  let { name } = useParams();

  // let logIn = localStorage.getItem("logged");
  // console.log(logIn);
  // if (!logIn || logIn != "true") {
  //   console.log("a");
  //   window.location.href=("/signIn");
  // }

  useEffect(() => {
    if (name) {
      fetch(process.env.REACT_APP_APIURL + "customer/" + name)
        .then((res) => res.json())
        .then((res) => {
          setCustomer(res);
        });
    }
  }, []);
  console.log(customer);
  function handleFormSubmit() {
    fetch(process.env.REACT_APP_APIURL + "customer", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      res.json();
      navigate("/");
    });
  }

  function handleUpdate() {
    fetch(process.env.REACT_APP_APIURL + "customer", {
      method: "PUT",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      res.json();

      navigate("/");
    });
  }

  return (
    <div>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            value={customer.name}
            onInput={(e) => {
              let obj = { ...customer };
              obj.name = e.target.value;
              setCustomer(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Website
          </label>
          <input
            value={customer.website}
            onInput={(e) => {
              let obj = { ...customer };
              obj.website = e.target.value;
              setCustomer(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Turnover
          </label>
          <input
            value={customer.turnover}
            onInput={(e) => {
              let obj = { ...customer };
              obj.turnover = e.target.value;
              setCustomer(obj);
            }}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            No Of Employees
          </label>
          <input
            value={customer.employees}
            onInput={(e) => {
              let obj = { ...customer };
              obj.employees = e.target.value;
              setCustomer(obj);
            }}
            type="number"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            CEO
          </label>
          <input
            value={customer.ceo}
            onInput={(e) => {
              let obj = { ...customer };
              obj.ceo = e.target.value;
              setCustomer(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Established In
          </label>
          <input
            value={customer.year}
            onInput={(e) => {
              let obj = { ...customer };
              obj.year = e.target.value;
              setCustomer(obj);
            }}
            type="number"
            className="form-control"
          ></input>
        </div>
        {!name && (
          <button
            onClick={handleFormSubmit}
            className="btn btn-primary float-end"
            type="button"
          >
            Create New Customer
          </button>
        )}
        {name && (
          <button
            onClick={handleUpdate}
            className="btn btn-success float-end"
            type="button"
          >
            Update Customer
          </button>
        )}
      </div>
    </div>
  );
}

export default CustomerForm;
