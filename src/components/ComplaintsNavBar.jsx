import { Link } from "react-router-dom";
const ComplaintsNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {/* <Link to="/add" className="nav-link">
              Add Complaint
            </Link> */}
            {/* <Link to="/show" className="nav-link">
              Complaints
            </Link> */}
          </div>
        </div>
      </div>
      <Link to="/logout" className="nav-link float-right">
        <div className="btn btn-outline-primary">Logout</div>
      </Link>
    </nav>
  );
};

export default ComplaintsNavBar;
