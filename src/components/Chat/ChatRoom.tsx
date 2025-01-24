import { useEffect, useState } from "react";

import { io } from "socket.io-client";
// import { v4 as uuid } from "uuid";

import { Grid } from "@mui/material";

import { useAppSelector } from "@store/hooks/hooks";

import ChatMessage from "./ChatMessage";
import { StyledChatRoom } from "./Chatroom.style";
import TypeMessageContainer from "./TypeMessageContainer";
import { Message } from "./types";

const socket = io(
  `http://localhost:3000?roomId=${"dc398446-f8bc-49a8-90cf-95ec4e335b59"}`,
);

const ChatRoom = () => {
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const [messages, setMessages] = useState<Array<Message> | []>([]);
  //   const [users, setUsers] = useState([]);
  //   const [user, setUser] = useState<ChatUser | null>(null);

  useEffect(() => {
    const messages = localStorage.getItem("messages") ?? "";

    if (messages !== "") {
      setMessages(JSON.parse(messages));
    } else {
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Receive messages
  useEffect(() => {
    socket.on("message", (message: Message) => {
      setMessages((messages: Message[]) => [...messages, message]);
    });
  }, []);

  //   // Join a chat room
  //   const joinChatRoom = (userDetails: ChatUser) => {
  //     setUser(userDetails);
  //     socket.emit("join", userDetails);
  //   };

  //   // Leave a chat room
  //   const leaveChatRoom = () => {
  //     socket.emit("leave", user);
  //     setUser(null);
  //   };

  // Send a message
  const sendMessage = (messageText: string) => {
    const message = JSON.stringify({
      userId: loggedUser?.id ?? "",
      userName: loggedUser?.firstName ?? "",
      text: messageText,
      createdAt: new Date(),
    });

    socket.emit("message", message);
  };

  return (
    <StyledChatRoom>
      <Grid container display="flex" flexDirection="column" height="100%">
        <Grid item flex={1}>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </Grid>
        <Grid item>
          <TypeMessageContainer sendMessage={sendMessage} />
        </Grid>
      </Grid>
    </StyledChatRoom>
  );
};

export default ChatRoom;
