import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { searchUser } from "../api";

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();
  // console.log(auth.user);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUser(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };
    if (searchText.length >= 2) {
      fetchUsers();
    } else {
      setResults([]);
    }
  }, [searchText]);
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
      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/512/149/149309.png"
          alt=""
        />
        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="user-img"
                    ></img>
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                alt="user"
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                className={styles.userDp}
              ></img>
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <span onClick={auth.logout}>Log out</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
