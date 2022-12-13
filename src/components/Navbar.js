import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/3800/3800024.png"
            style={{ width: "40px", height: "40px" }}
          ></img>
        </Link>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              alt="user"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className={styles.userDp}
            ></img>
          </a>
          <span>Yash</span>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
