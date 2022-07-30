import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <div className={isUser ? "message__userCard" : "message__guestCard"}>
        {!isUser && `${message.username || "Anonymous User"}:`}{" "}
        <p>{message.message}</p>
      </div>
    </div>
  );
});

export default Message;
