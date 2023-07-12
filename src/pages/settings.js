import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import imageCompression from "browser-image-compression";
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { addToast } = useToasts();
  const updateProfile = async (name, password, confirmPassword) => {
    setSavingForm(true);
    if (!name || !password || !confirmPassword) {
      setSavingForm(false);

      return addToast("Please enter all the fields", {
        appearance: "error",
      });
    }
    if (password !== confirmPassword) {
      setSavingForm(false);

      return addToast("Password And Confirm Password not match", {
        appearance: "error",
      });
    }

    const compressedFile = await imageCompression(avatar, { maxSizeMB: 0.05 });
    const response = await auth.updateUser(
      name,
      password,
      confirmPassword,
      compressedFile
    );
    console.log(response);
    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      return addToast("User Profile Updated Successfully", {
        appearance: "success",
      });
    } else {
      setEditMode(false);
      setSavingForm(false);
      return addToast("Cannot update user profile", {
        appearance: "error",
      });
    }
  };
  // useEffect(() => {
  //   if (!auth.user) {
  //     return Navigate("/login");
  //   }
  // }, [auth]);
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src={
            auth.user.avatar != ""
              ? auth.user.avatar
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="user-img"
        ></img>
        {editMode && (
          <input
            type="file"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              // console.log(e.target.files[0]);
            }}
          ></input>
        )}
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <div className={styles.fieldValue}>{auth.user?.name}</div>
          </>
        )}
      </div>
      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}

      {editMode ? (
        <>
          <div className={styles.btnGrp}>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={() => updateProfile(name, password, confirmPassword)}
              disabled={savingForm}
            >
              {savingForm ? "Saving Profile..." : "Save Profile"}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.btnGroup}>
            <button
              onClick={() => {
                setEditMode(true);
              }}
              className={`button ${styles.editBtn}`}
            >
              Edit Profile
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
