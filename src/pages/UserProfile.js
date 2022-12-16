import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const UserProfile = () => {
  const Navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      return Navigate("/login");
    }
  }, [auth]);
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user-img"
        ></img>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>email</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>name</div>
      </div>
      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
