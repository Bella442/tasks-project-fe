import { useEffect, useState } from "react";

// import { v4 as uuid } from "uuid";

import { Grid } from "@mui/material";

import Scrollbar from "@components/Scrollbar/Scrollbar";
import { useAppSelector } from "@store/hooks/hooks";

import ChatMessage from "./ChatMessage";
import { StyledChatRoom } from "./Chatroom.style";
import TypeMessageContainer from "./TypeMessageContainer";
import {
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useReceiveMessagesQuery,
  useSendMessageMutation,
} from "./chatApi";
import { Message } from "./types";

const ChatRoom = () => {
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const [activeRoom] = useState<string>("d1f5e46c-06a6-4e38-b964-765ec5cb7dcb");
  // const [rooms] = useState(["d1f5e46c-06a6-4e38-b964-765ec5cb7dcb", "room2", "room3"]);

  const { data: messages = [] } = useReceiveMessagesQuery(activeRoom);
  const [joinRoom] = useJoinRoomMutation();
  const [leaveRoom] = useLeaveRoomMutation();
  const [sendMessage] = useSendMessageMutation();
  // const lastMessageRef = useRef<React.MutableRefObject<HTMLDivElement> | null>(null);

  useEffect(() => {
    const container = document.getElementById("messages");

    // container?.lastElementChild?.scrollTo(0, container?.scrollHeight);
    // container?.scrollTo(0, 0);
    // container?.firstElementChild?.scrollIntoView();
    container?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    // container?.scrollTo(0, container?.scrollHeight ?? 0);
  }, [messages]);

  useEffect(() => {
    // Join the initial room
    joinRoom(activeRoom);

    return () => {
      // Leave the active room on unmount
      leaveRoom(activeRoom);
    };
  }, [activeRoom, joinRoom, leaveRoom]);

  // const handleRoomChange = (newRoom: string) => {
  //   leaveRoom(activeRoom); // Leave the current room
  //   setActiveRoom(newRoom); // Switch to the new room
  //   joinRoom(newRoom); // Join the new room
  // };

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim().length > 0) {
      const message: Message = {
        userId: loggedUser?.id ?? null,
        userName: loggedUser?.firstName ?? "",
        text: messageText,
        createdAt: new Date().toDateString(),
      };

      sendMessage({ roomId: activeRoom, message });
    }
  };

  return (
    <StyledChatRoom>
      <Grid container display="flex" flexDirection="column" height="100%">
        <Grid item flex={1} height="70%" overflow="hidden">
          <Scrollbar>
            <div id="messages">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  loggedUser={loggedUser}
                  message={message}
                />
              ))}
            </div>
          </Scrollbar>
        </Grid>
        <Grid item>
          <TypeMessageContainer sendMessage={handleSendMessage} />
        </Grid>
      </Grid>
    </StyledChatRoom>
  );
};

export default ChatRoom;
