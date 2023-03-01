import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomerList from "./Components/CustomerList/CustomerList";
import CustomerForm from "./Components/CustomerForm/CustomerForm";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Secure from "./Components/Secure";
import User from "./Pages/User/User";
import UserForm from "./Pages/UserForm/UserForm";
import Ticket from "./Pages/Ticket/Ticket";
import TicketForm from "./Pages/TicketForm/TIcketForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Secure>
              <CustomerList />
            </Secure>
          }
        ></Route>

        <Route
          path="/form"
          element={
            <Secure>
              <CustomerForm />
            </Secure>
          }
        ></Route>
        <Route path="form/:name" element={<CustomerForm />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/SignIn" element={<SignIn />}>
          {" "}
        </Route>
        <Route
          path="/ticket"
          element={
            <Secure>
              <Ticket />
            </Secure>
          }
        ></Route>
        <Route
          path="/ticketform/:desc"
          element={
            <Secure>
              <TicketForm />
            </Secure>
          }
        ></Route>
        <Route
          path="/ticketform"
          element={
            <Secure>
              <TicketForm />
            </Secure>
          }
        ></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/userform" element={<UserForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
