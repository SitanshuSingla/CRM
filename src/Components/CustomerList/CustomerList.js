import "./CustomerList.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DashBoard from "../CustomerDashBoard/DashBoard";
import Pagination from "../Pagination/Pagination";

function CustomerList() {
  // Storing data in state
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  let [search, setSearch] = useState("");
  let { checkbutton } = useParams();

  let [new1, setNew1] = useState(0);
  let [accepted, setAccpted] = useState(0);
  let [rejected, setRejected] = useState(0);
  let [total, setTotal] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  // let logIn = localStorage.getItem("logged");

  // if (!logIn && logIn != "true") {
  //   navigate("/signIn");
  // }

  // Call the api.
  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "customer/page/" + pageNumber)
      .then((res) => res.json())
      .then((res) => {
        setTotal(res.totalCount);
        setCustomers(res.records);
        new1 = res.records.filter((c) => c.status == "New").length;
        setNew1(new1);
        accepted = res.records.filter((c) => c.status == "Accepted").length;
        setAccpted(accepted);

        rejected = res.records.filter((c) => c.status == "Rejected").length;
        setRejected(rejected);
      });
  }, [customers]);

  function handleNewCustomerClick() {
    navigate("form");
  }

  function handleEdit(name) {
    navigate("/form/" + name);
  }
  function handleDelete(name) {
    fetch(process.env.REACT_APP_APIURL + "customer/" + name, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {
        setCustomers(res);
      });
  }

  function handleSearch(search) {
    setSearch(search);
  }
  function handleTicket() {
    navigate("ticket");
  }

  return (
    <div>
      <Navbar handleSearch={handleSearch} checkbutton={checkbutton} />
      <div className="container">
        <button onClick={handleNewCustomerClick} className="btn btn-success">
          New Customer
        </button>

        {customers.length === 0 && (
          <div class="alert alert-primary mt-3" role="alert">
            No Customers are available im system.
          </div>
        )}
        {customers.length > 0 && (
          <div>
            <DashBoard
              new1={new1}
              accepted={accepted}
              rejected={rejected}
              customers={customers}
            />

            <div class="input-group">
              <input
                onChange={(e) => {
                  if (e.target.value == "") setSearch("*");
                  else setSearch(e.target.value);
                }}
                type="search"
                className="form-control rounded for"
                placeholder="Search Name"
                aria-label="Search"
                aria-describedby="search-addon"
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Website</th>
                  <th scope="col">Status</th>
                  <th scope="col">Turnover</th>
                  <th scope="col">NumberOfEmployees</th>
                  <th scope="col">CEO</th>
                  <th scope="col">Established Year</th>
                </tr>
              </thead>
              <tbody>
                {/* rendering data in table rows. */}
                {customers
                  .filter((i) => {
                    if (search == undefined || search == "*") return i;
                    else if (
                      i.name.toLowerCase().includes(search.toLowerCase())
                    )
                      return i;
                  })
                  .map((c) => (
                    <tr>
                      <td>{c.name}</td>
                      <td>{c.website}</td>
                      <td
                        className={
                          c.status == "New"
                            ? "new"
                            : c.status == "Rejected"
                            ? "rejected"
                            : "accepted"
                        }
                      >
                        {c.status}
                      </td>
                      <td>{c.turnover}</td>
                      <td>{c.employees}</td>
                      <td>{c.ceo}</td>
                      <td>{c.year}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(c.name)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(c.name)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        total={total}
        customers={customers}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  );
}

export default CustomerList;
