import { useState } from "react";
import styles from "../styles/login.module.css";
import { useToasts } from "react-toast-notifications";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return addToast("Please enter both email and password", {
        appearance: "error",
      });
    }
    setLoggingIn(true);
  };
  return (
    <form className={styles.loginForm} onSubmit={handelSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field} disabled={loggingIn}>
        <button>{loggingIn ? "Logging In..." : "Log In"}</button>
      </div>
    </form>
  );
};

export default Login;
