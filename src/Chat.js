import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useStateValue } from "./StateProvider";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const bottomRef = useRef(null);

  //Pull messages from the database
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  //Add messages to the database
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username: user?.displayName || user?.email || user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  // 👇️ scroll to bottom every time messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //   console.log(messages);

  return (
    <div className="chat">
      <img
        src="https://i.ibb.co/WcrMv78/Screenshot-3483.png"
        alt="my-chat logo"
      />
      <h1>Welcome to My-Chat</h1>
      <h2>Welcome {user?.displayName || user?.email || user}</h2>

      <form className="chat__form">
        <input
          className="chat__input"
          placeholder="Enter a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="chat__submitBtn"
          onClick={sendMessage}
          disabled={!input}
        >
          Send
        </button>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message
            key={id}
            username={user?.displayName || user?.email || user}
            message={message}
          />
        ))}
      </FlipMove>

      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;
