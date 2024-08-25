import styles from "../styles/home.module.css";
import { FriendList, Loader, CreatePost, Post, ChatBox } from "../components";
import { useAuth, usePosts } from "../hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Home = () => {
  const auth = useAuth();
  const { posts, loading } = usePosts();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_ROOT_API);
    setSocket(newSocket);
    // console.log(newSocket);
    newSocket.on("connect", () => {
      console.log("connected");
    });
  }, []);
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
      {auth.user && socket && <ChatBox socket={socket} />}
    </div>
  );
};

export default Home;
