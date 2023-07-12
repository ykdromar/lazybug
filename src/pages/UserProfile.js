import styles from "../styles/settings.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components";
import { addFriend, removeFriend, userInfo } from "../api";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../hooks";
const UserProfile = () => {
  const auth = useAuth();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [inProgress, setInProgress] = useState(false);
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
  // console.log(auth);

  const isFriend = () => {
    const friendsArr = auth.friends;
    const friendIds = friendsArr.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  // function to handel add friend button
  const handelAddFriend = async () => {
    setInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      addToast("You are now friends", {
        appearance: "success",
      });
    } else {
      addToast("Cannot Make Friend", {
        appearance: "error",
      });
    }
    setInProgress(false);
    return;
  };

  //function to handel removeFriend button
  const handelRemoveFriend = async () => {
    setInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      auth.updateUserFriends(false, userId);
      addToast("You are now not friends", {
        appearance: "success",
      });
    } else {
      addToast("Cannot Remove Friend", {
        appearance: "error",
      });
    }
    setInProgress(false);
    return;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src={
            user.avatar != ""
              ? auth.user.avatar
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
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
      {/* <div className={styles.btnGrp}>
        {isFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handelRemoveFriend}
            disabled={inProgress}
          >
            {inProgress ? "Removing Friend..." : "Remove Friend"}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handelAddFriend}
            disabled={inProgress}
          >
            {inProgress ? "Adding Friend..." : "Add Friend"}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default UserProfile;
