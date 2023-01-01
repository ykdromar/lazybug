import styles from "../styles/chatbox.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks";

const ChatBox = (props) => {
  const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessageValue, setNewMessageValue] = useState("");
  const { socket } = props;

  useEffect(() => {
    socket.emit("Join_room", {
      user_email: auth.user.email,
      chatroom: "Codeial",
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);
  socket.on("user_joined", function (data) {
    console.log("a user joined", data);
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

    setMessages([...messages, newMessage]);
  });

  const sendMessage = () => {
    if (newMessageValue !== "") {
      let newMessage = {
        message: newMessageValue,
        user_email: auth.user.email,
        chatroom: "Codeial",
      };
      setNewMessageValue("");
      console.log("Sending message", newMessage);
      socket.emit("send_message", newMessage);
    }
  };
  return (
    <div className={styles.chatbox}>
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
};
export default ChatBox;
