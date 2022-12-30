import { Link } from "react-router-dom";
import { useContext } from "react";

import "./navbar.css";

import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">Booking Website</span>
        </Link>
        <div className="navItems">
          <p>{user?.username}</p>
          <Link to={user ? `transactions/${user._id}` : "signup"}>
            <button className="navButton">
              {user ? "Transactions" : "Sign Up"}
            </button>
          </Link>
          <Link to="login">
            <button className="navButton" onClick={handleLogout}>
              {user ? "Logout" : "Login"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
