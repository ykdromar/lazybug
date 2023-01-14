import styles from "../styles/home.module.css";
import { FriendList, Loader, CreatePost, Post, ChatBox } from "../components";
import { useAuth, usePosts } from "../hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Home = () => {
  const auth = useAuth();
  const { posts, loading } = usePosts();
  const [socket, setSocket] = useState(null);
  const [showChatBox, setShowChatBox] = useState(false);
  useEffect(() => {
    const newSocket = io(`https://codeial.ykdromar.me`);
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
      {auth.user && socket && showChatBox && (
        <ChatBox socket={socket} setShowChatBox={setShowChatBox} />
      )}
      {auth.user && socket && !showChatBox && (
        <div
          className={styles.chatIcon}
          onClick={() => {
            setShowChatBox(true);
          }}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/724/724689.png" />
        </div>
      )}
    </div>
  );
};

export default Home;
