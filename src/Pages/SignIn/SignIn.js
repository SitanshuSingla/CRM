import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  let [user, setUser] = useState({});
  let [check, setCheck] = useState(false);

  let navigate = useNavigate();

  function handleSignIn() {
    fetch(process.env.REACT_APP_APIURL + "user/signin", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status == 400) {
          setCheck(true);
        } else {
          localStorage.setItem("logged", "true");

          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="c">
        <div className="left">
          <img
            src="https://www.superoffice.co.uk/globalassets/home-com-website/resources/articles/visuals/best-crm/crm-strategy.png"
            alt=""
          />
        </div>
        <div className="right">
          {check && (
            <div className="alert alert-danger" role="alert">
              Invalid Credentials
            </div>
          )}
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              let obj = { ...user };
              obj.email = e.target.value;
              setUser(obj);
            }}
            type="email"
            className="form-control"
          />
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              let obj = { ...user };
              obj.password = e.target.value;
              setUser(obj);
            }}
            type="password"
            className="form-control"
          />

          <center>
            {" "}
            <button onClick={handleSignIn} className="btn btn-success mt-3">
              SignIn
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
