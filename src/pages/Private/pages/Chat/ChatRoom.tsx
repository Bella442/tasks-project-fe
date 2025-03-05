import { useEffect, useMemo, useRef } from "react";

import { Grid } from "@mui/material";

import Scrollbar from "@components/Scrollbar/Scrollbar";
import { useAppSelector } from "@store/hooks/hooks";

import ChatMessage from "./ChatMessage";
import { StyledChatRoom } from "./ChatRoom.style";
import TypeMessageContainer from "./TypeMessageContainer";
import {
  useGetChatHistoryQuery,
  useMarkMessagesReadMutation,
  useReceiveMessagesQuery,
  useSendMessageMutation,
} from "./api/chatApi";
import { Message } from "./types";

interface Scrollbar {
  scrollToBottom: () => void;
}

const ChatRoom = () => {
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const activeRoom = useAppSelector((state) => state.chat.activeRoom);
  const scrollbarRef = useRef(null);
  const { data } = useReceiveMessagesQuery();
  const { data: chatHistory } = useGetChatHistoryQuery({
    roomId: activeRoom,
  });
  const [sendMessage] = useSendMessageMutation();
  const [markMessagesRead] = useMarkMessagesReadMutation();

  const currentRoomMessages = useMemo(() => {
    const messages = new Map<string, Message[]>([[activeRoom, []]]);

    if (chatHistory) {
      messages.set(activeRoom, [...chatHistory]);
    }

    if (data) {
      for (const [key, value] of Object.entries(data)) {
        // Ensure messages re not duplicated
        messages.set(
          key,
          Array.from(new Set([...(chatHistory || []), ...value])),
        );
      }
    }

    const roomMessages = messages?.get(activeRoom);

    roomMessages?.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return roomMessages;
  }, [data, chatHistory, activeRoom]);

  useEffect(() => {
    const current = scrollbarRef.current as unknown as Scrollbar;

    if (current) {
      setTimeout(() => {
        current.scrollToBottom();
      }, 50);
    }
  }, [currentRoomMessages, markMessagesRead, activeRoom]);

  useEffect(() => {
    return () => {
      markMessagesRead({ roomId: activeRoom });
    };
  }, [markMessagesRead, activeRoom]);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim().length > 0) {
      const message: Message = {
        sentBy: loggedUser?.id ?? "",
        userName: loggedUser?.firstName ?? "",
        text: messageText,
        createdAt: new Date().toString(),
      };

      sendMessage({ roomId: activeRoom, message });
    }
  };

  return (
    <StyledChatRoom>
      <Grid container display="flex" flexDirection="column" height="100%">
        <Grid item flex={1} height="70%" overflow="hidden">
          <Scrollbar ref={scrollbarRef}>
            {currentRoomMessages?.map((message: Message, index: number) => (
              <ChatMessage
                key={index}
                loggedUser={loggedUser}
                message={message}
              />
            ))}
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
