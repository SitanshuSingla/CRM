import { Fragment, useEffect, useState } from "react";

export default function Secure(props) {
  let [log, setLog] = useState(false);
  useEffect(() => {
    let logIn = localStorage.getItem("logged");

    if (!logIn && logIn != "true") {
      window.location.href = "/signIn";
    } else {
      setLog(true);
    }
  }, []);

  return <Fragment>{log ? props.children : null}</Fragment>;
}
