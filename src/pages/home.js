import styles from "../styles/home.module.css";
import { FriendList, Loader, CreatePost, Post } from "../components";
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
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {/* {auth.user && <FriendList />} */}
    </div>
  );
};

export default Home;
