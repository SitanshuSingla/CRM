import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
  let [logg, setLog] = useState(false);
  let [search, setSearch] = useState("");

  let navigate = useNavigate();
  function handleSIgnUp() {
    navigate("/signup");
  }
  function handleSIgnin() {
    navigate("/SignIn");
  }

  function signOut() {
    // localStorage.removeItems("logged")
    localStorage.clear();
    navigate("/SignIn");
  }

  let log = localStorage.getItem("logged");
  useEffect(() => {
    if (log && log === "true") {
      setLog(true);
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CRM
          </a>
          <a className="navbar-brand" href="/user">
            Users
          </a>
          <a className="navbar-brand" href="/ticket">
            Tickets
          </a>

          {!logg && (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    onClick={handleSIgnUp}
                    className="btn btn-primary"
                    aria-current="page"
                  >
                    SignUp
                  </button>
                  &nbsp;
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    aria-current="page"
                    onClick={handleSIgnin}
                  >
                    SignIn
                  </button>
                </li>
              </ul>
            </div>
          )}
          {log && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 out">
              <li className="nav-item btn2">
                <button
                  onClick={signOut}
                  className="btn btn-primary "
                  aria-current="page"
                >
                  SignOut
                </button>
                &nbsp;
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
