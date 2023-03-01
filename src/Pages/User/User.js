import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./User.css";

export default function User() {
  // state is storage which when changes refreshes compnent
  let [user, setUSer] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    fetch(process.env.REACT_APP_APIURL + "user")
      .then((res) => res.json())
      .then((res) => {
        setUSer(res);
      });
  });

  function handleuser() {
    navigate("/userform");
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <button onClick={handleuser} className="btn btn-success">
          New User
        </button>

        {user.length === 0 && (
          <div class="alert alert-primary mt-3" role="alert">
            No Users are available im system.
          </div>
        )}
        {user.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">UserName</th>

                <th scope="col">Email</th>
                <th scope="col">isActive</th>
              </tr>
            </thead>
            <tbody>
              {/* rendering data in table rows. */}
              {user.map((c) => (
                <tr>
                  <td>{c.name}</td>
                  <td>{c.username}</td>

                  <td>{c.email}</td>
                  <td>{c.isActive ? "Yes" : "No"}</td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
