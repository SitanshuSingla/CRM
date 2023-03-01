import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  let [user, setUser] = useState({});

  let navigate = useNavigate();

  function handleSignUp() {
    console.log(user);
    fetch(process.env.REACT_APP_APIURL + "user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        console.log(res);
        navigate("/signin");
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
          <label htmlFor="" className="form-label">
            Name
          </label>
          <input
            onInput={(e) => {
              let obj = { ...user };
              obj.name = e.target.value;
              setUser(obj);
            }}
            type="email"
            className="form-control"
          />
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input
            onInput={(e) => {
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
            onInput={(e) => {
              let obj = { ...user };
              obj.password = e.target.value;
              setUser(obj);
            }}
            type="password"
            className="form-control"
          />

          <center>
            {" "}
            <button onClick={handleSignUp} className="btn btn-success mt-3">
              SignUp
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}
