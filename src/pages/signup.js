import styles from "../styles/login.module.css";
import { useToasts } from "react-toast-notifications";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [signingup, setSigningup] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  const Navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !confirmPassword) {
      return addToast("Please enter all the details", {
        appearance: "error",
      });
    }
    if (password !== confirmPassword) {
      return addToast("Password and Confirm Password not match", {
        appearance: "error",
      });
    }
    setSigningup(true);
    const response = await auth.signup(name, email, password, confirmPassword);
    console.log(response);
    if (response.success) {
      setSigningup(false);
      Navigate("/login");
      return addToast("Signed Up Successfully", {
        appearance: "success",
      });
    } else {
      setSigningup(false);

      return addToast("Could Not Signup, Please Try again", {
        appearance: "error",
      });
    }
  };
  useEffect(() => {
    if (auth.user) {
      return Navigate("/");
    }
  }, [auth]);
  return (
    <form className={styles.loginForm} onSubmit={handelSubmit}>
      <span className={styles.loginSignupHeader}>Register</span>
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
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
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.field}>
        <button disabled={signingup}>
          {signingup ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};
export default Signup;
