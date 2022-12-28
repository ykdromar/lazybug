import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { searchUser } from "../api";
import { useMediaQuery } from "react-responsive";
import DropdownMenu from "./DropdownMenu";
const Navbar = () => {
  const [results, setResults] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 550px)" });
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
            style={{ width: "35px", height: "35px" }}
          ></img>
        </Link>
        <div className={styles.searchContainer}>
          <img
            className={styles.searchIcon}
            src="https://cdn-icons-png.flaticon.com/512/149/149309.png"
            alt=""
          />
          <input
            placeholder="Search"
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
      </div>

      <div className={styles.rightDiv}>
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
        {!isTabletOrMobile ? (
          <div className={styles.navLinks}>
            {auth.user ? (
              <>
                <button onClick={auth.logout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button>Sign in</button>
                </Link>

                <Link to="/register">
                  <button>Register</button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <DropdownMenu isOpened={isOpened} setIsOpened={setIsOpened}>
            <div className={styles.navLinks}>
              {auth.user ? (
                <>
                  <button onClick={auth.logout}>Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button>Sign in</button>
                  </Link>

                  <Link to="/register">
                    <button>Register</button>
                  </Link>
                </>
              )}
            </div>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
export default Navbar;
