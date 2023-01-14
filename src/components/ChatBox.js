import styles from "../styles/chatbox.module.css";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks";
import ScrollToBottom from "react-scroll-to-bottom";
const ChatBox = (props) => {
  const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessageValue, setNewMessageValue] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);
  const { socket } = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (localStorage.getItem("CODEIALCHAT")) {
      setMessages(JSON.parse(localStorage.getItem("CODEIALCHAT")));
    }
    socket.emit("Join_room", {
      user_email: auth.user.email,
      chatroom: "Codeial",
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);
  socket.on("user_joined", function (data) {
    console.log("a user joined");
  });
  socket.on("recieved_message", (data) => {
    let messageType = "incomming";
    if (data.user_email === auth.user.email) {
      messageType = "outgoing";
    }
    let newMessage = {
      content: data.message,
      type: messageType,
    };
    let chat = [...messages, newMessage];
    localStorage.setItem("CODEIALCHAT", JSON.stringify(chat));
    setMessages([...messages, newMessage]);
  });

  useEffect(() => {
    scrollToBottom();
  });

  const sendMessage = () => {
    if (newMessageValue !== "") {
      let newMessage = {
        message: newMessageValue,
        user_email: auth.user.email,
        chatroom: "Codeial",
      };
      setNewMessageValue("");
      // console.log("Sending message", newMessage);
      socket.emit("send_message", newMessage);
    }
  };
  if (showChatBox) {
    console.log("showing chatbox", showChatBox);

    return (
      <div className={styles.chatbox}>
        <div className={styles.chatHeader}>
          <span>Chat Room</span>
          <span
            onClick={() => {
              setShowChatBox(false);
            }}
          >
            ❌
          </span>
        </div>

        <ul className={styles.messages}>
          {messages.map((message, index) => {
            if (message.type === "incomming") {
              return (
                <li
                  className={`${styles.message} ${styles.incommingMessage}`}
                  key={index}
                >
                  <span>{message.content}</span>
                </li>
              );
            } else {
              return (
                <li
                  className={`${styles.message} ${styles.outgoingMessage}`}
                  key={index}
                >
                  <span>{message.content}</span>
                </li>
              );
            }
          })}
          <div style={{ visibility: "hidden" }} ref={messagesEndRef}></div>
        </ul>
        <div className={styles.newMessage}>
          <input
            className={styles.chatinput}
            type="text"
            placeholder="New Message"
            value={newMessageValue}
            onChange={(e) => {
              setNewMessageValue(e.target.value);
            }}
            onKeyDown={(e) => {
              // e.preventDefault();
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          ></input>
          <button className={styles.sendBtn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  } else {
    console.log("not showing chatbox", showChatBox);
    return (
      <div
        className={styles.chatIcon}
        onClick={() => {
          setShowChatBox(true);
        }}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/724/724689.png" />
      </div>
    );
  }
};
export default ChatBox;
