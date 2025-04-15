import { NavLink, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body">
          <nav className="p-3 bg-light">
            <NavLink to="/">
              <i className="bi bi-house-door"></i> Home
            </NavLink>{" "}
            |{" "}
            <NavLink to="/add">
              <i className="bi bi-person-plus"></i> Add Contact
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}