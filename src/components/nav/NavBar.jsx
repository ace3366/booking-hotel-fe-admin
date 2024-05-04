import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./NavBar.module.css";
const NavBar = ({ className }) => {
  return (
    <section className={`${className} ${classes["navbar-total"]}`}>
      <div className={classes.navbar}>
        <div>
          <h3>MAIN</h3>
          <Link to="dashboard">
            <i className="fa-solid fa-border-all"></i>
            <span>Dashboard</span>
          </Link>
        </div>

        <div>
          <h3>LISTS</h3>
          <Link to="users">
            <i className="fa-regular fa-user"></i>
            <span>Users</span>
          </Link>
          <Link to="hotels">
            <i className="fa-solid fa-hotel"></i>
            <span>Hotels</span>
          </Link>
          <Link to="rooms">
            <i className="fa-solid fa-door-open"></i>
            <span>Rooms</span>
          </Link>
          <Link to="transactions">
            <i className="fa-solid fa-truck"></i>
            <span>Transactions</span>
          </Link>
        </div>

        <div>
          <h3>NEW</h3>
          <Link to="new-hotel">
            <i className="fa-solid fa-hotel"></i>
            <span>New Hotel</span>
          </Link>
          <Link to="new-room">
            <i className="fa-solid fa-door-open"></i>
            <span>New Room</span>
          </Link>
        </div>

        <div>
          <h3>USER</h3>
          <Link to="login">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default NavBar;
