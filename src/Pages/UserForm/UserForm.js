import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UserForm() {
  let [userform, setUserForm] = useState([]);
  let navigate = useNavigate();
  function handleusersubmit() {
    fetch(process.env.REACT_APP_APIURL + "user/signup", {
      method: "POST",
      body: JSON.stringify(userform),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log(userform);
      navigate("/user");
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
            value={userform.name}
            onInput={(e) => {
              let obj = { ...userform };
              obj.name = e.target.value;
              setUserForm(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            UserName
          </label>
          <input
            value={userform.username}
            onInput={(e) => {
              let obj = { ...userform };
              obj.username = e.target.value;
              setUserForm(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            value={userform.email}
            onInput={(e) => {
              let obj = { ...userform };
              obj.email = e.target.value;
              setUserForm(obj);
            }}
            type="text"
            className="form-control"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Password
          </label>
          <input
            value={userform.password}
            onInput={(e) => {
              let obj = { ...userform };
              obj.password = e.target.value;
              setUserForm(obj);
            }}
            type="password"
            className="form-control"
          ></input>
        </div>

        <input
          value={userform.isActive}
          onInput={(e) => {
            let obj = { ...userform };
            obj.isActive = e.target.checked;
            setUserForm(obj);
          }}
          type="checkbox"
        ></input>
        <label htmlFor="exampleFormControlInput1" className="form-label">
          isActive
        </label>
        {
          <button
            onClick={handleusersubmit}
            className="btn btn-primary float-end"
            type="button"
          >
            Create New User
          </button>
        }
        {
          <button className="btn btn-success float-end" type="button">
            Update User
          </button>
        }
      </div>
    </div>
  );
}
