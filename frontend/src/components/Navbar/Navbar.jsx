import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-custom navbar navbar-expand-lg px-4">
      <div className="container-fluid">
        <div className="d-flex align-items-center gap-4">
          <Link to="/" className="navbar-icon-link">
            <i className="bi bi-file-earmark-code navbar-github-icon"></i>
          </Link>
          <div className="d-flex align-items-center gap-4">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link to="/matches" className="navbar-link">
              Matches
            </Link>
            <Link to="/dashboard" className="navbar-link">
              Dashboard
            </Link>
            <Link to="/profile" className="navbar-link">
              Profile
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button type="button" className="btn btn-outline-light">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
