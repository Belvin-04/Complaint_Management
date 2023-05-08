import { Link } from "react-router-dom";
const UserNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-link">
              SignIn
            </Link>
            <Link to="/signup" className="nav-link">
              {" "}
              SignUp{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
