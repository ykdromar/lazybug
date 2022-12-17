import styles from "../styles/home.module.css";
import { useState } from "react";
import { addComment } from "../api";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuth, usePosts } from "../hooks";
const Post = ({ post }) => {
  const { addToast } = useToasts();
  const postsContext = usePosts();
  const auth = useAuth();
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const handelAddComment = async (e) => {
    if (!addingComment && e.key === "Enter") {
      setAddingComment(true);
      const response = await addComment(comment, post._id);
      if (response.success) {
        // console.log(response.data);
        setComment("");
        postsContext.addCommentToState(response.data.comment, post._id);
        addToast("Comment Added", {
          appearance: "success",
        });
        setAddingComment(false);
        return;
      } else {
        addToast(response.message, {
          appearance: "error",
        });
        setAddingComment(false);
        return;
      }
    }
  };
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="user-pic"
          />
          <div>
            <Link to={`user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
              alt="likes-icon"
            />
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/13/13673.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        {auth.user && (
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              onKeyDown={handelAddComment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        )}

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <div className={styles.postCommentsItem} key={comment._id}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>
                  {comment.user.name}
                </span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>
                  {comment.likes.length} Likes
                </span>
              </div>

              <div className={styles.postCommentContent}>{comment.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
