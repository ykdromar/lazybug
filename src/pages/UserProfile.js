import styles from "../styles/settings.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components";
import { userInfo } from "../api";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
const UserProfile = () => {
  const auth = useAuth();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const Navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const response = await userInfo(userId);
      if (response.success) {
        console.log(response.data.user);
        setUser(response.data.user);
        setLoading(false);
        return;
      } else {
        console.log(response.message);
        addToast("User not found !", {
          appearance: "error",
        });
        setLoading(false);

        return Navigate("/");
      }
    };
    getUser();
  }, [userId, Navigate, addToast]);
  //function to check if this user is friend
  const isFriend = () => {
    const friendsArr = auth.user.friendships;
    const friendIds = friendsArr.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(auth.user._id);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  if (loading) {
    return <Loader />;
  }
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
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>
      <div className={styles.btnGrp}>
        {isFriend() ? (
          <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
