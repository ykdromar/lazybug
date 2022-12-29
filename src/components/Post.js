import styles from "../styles/home.module.css";
import { useState } from "react";
import { addComment, toggleLike } from "../api";
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
      const response = await addComment(comment, post._id, auth.user._id);
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

  // function to handel post like
  const handelPostLike = async () => {
    const response = await toggleLike(post._id, "Post", auth.user._id);
    if (response.success) {
      console.log(response);
      postsContext.addLikesToPostState(response.data.likes, post._id);
      if (response.data.deleted) {
        addToast("Unliked Post", {
          appearance: "success",
        });
        return;
      } else {
        addToast("Liked Post", {
          appearance: "success",
        });
        return;
      }
    } else {
      addToast(response.message, {
        appearance: "error",
      });
      return;
    }
  };
  //function to handel comment like
  const handelCommentLike = async (commentId, postId) => {
    const response = await toggleLike(commentId, "Comment", auth.user._id);
    if (response.success) {
      postsContext.addLikesToCommentState(
        response.data.likes,
        commentId,
        postId
      );

      if (response.data.deleted) {
        addToast("Unliked Comment", {
          appearance: "success",
        });
        return;
      } else {
        addToast("Liked Comment", {
          appearance: "success",
        });
        return;
      }
    } else {
      addToast(response.message, {
        appearance: "error",
      });
      return;
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
            <span className={styles.postTime}>{/*time */}</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button
              onClick={handelPostLike}
              disabled={!auth.user}
              style={{ backgroundColor: "white", border: "none" }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                alt="likes-icon"
              />
            </button>
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
              placeholder="Write your comment"
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
                <span className={styles.postCommentTime}>{/* time */}</span>
                <span className={styles.postCommentLikes}>
                  <button
                    onClick={() => {
                      handelCommentLike(comment._id, post._id);
                    }}
                    disabled={!auth.user}
                    style={{ backgroundColor: "white", border: "none" }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2589/2589175.png"
                      alt="likes-icon"
                      style={{ width: "18px" }}
                    />
                  </button>
                  {comment.likes.length}
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
