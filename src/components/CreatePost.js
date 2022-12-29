import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { useToasts } from "react-toast-notifications";
import { usePosts } from "../hooks";
const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const postsContext = usePosts();
  const handelAddPost = async () => {
    setAddingPost(true);
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      postsContext.addPostToState(response.data.post);
      addToast("Posted successfully", {
        appearance: "success",
      });
      setAddingPost(false);
      return;
    } else {
      addToast(response.message, {
        appearance: "error",
      });
      setAddingPost(false);
      return;
    }
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
        required={true}
        placeholder="Write your thoughts here ... "
      ></textarea>
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handelAddPost}
          disabled={addingPost}
        >
          {addingPost ? "Adding Post" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
