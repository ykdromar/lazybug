import styles from "../styles/home.module.css";
import { FriendList, Loader, CreatePost } from "../components";
import { Link } from "react-router-dom";
import { useAuth, usePosts } from "../hooks";
const Home = () => {
  const auth = useAuth();
  const { posts, loading } = usePosts();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}

        {posts.map((post) => (
          <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="user-pic"
                />
                <div>
                  <Link
                    to={`user/${post.user._id}`}
                    className={styles.postAuthor}
                  >
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
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <div className={styles.postCommentsItem} key={comment._id}>
                    <div className={styles.postCommentHeader}>
                      <span className={styles.postCommentAuthor}>
                        {comment.user.name}
                      </span>
                      <span className={styles.postCommentTime}>
                        a minute ago
                      </span>
                      <span className={styles.postCommentLikes}>
                        {comment.likes.length} Likes
                      </span>
                    </div>

                    <div className={styles.postCommentContent}>
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
