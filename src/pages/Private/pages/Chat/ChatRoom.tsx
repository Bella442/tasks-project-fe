import { useEffect, useMemo, useRef } from "react";

import { Grid } from "@mui/material";

import Scrollbar from "@components/Scrollbar/Scrollbar";
import { useAppSelector } from "@store/hooks/hooks";

import ChatMessage from "./ChatMessage";
import { StyledChatRoom } from "./ChatRoom.style";
import TypeMessageContainer from "./TypeMessageContainer";
import {
  useGetChatHistoryQuery,
  useReceiveMessagesQuery,
  useSendMessageMutation,
} from "./api/chatApi";
import { Message } from "./types";

interface IProperties {
  activeRoom: string;
}

interface Scrollbar {
  scrollToBottom: () => void;
}

const ChatRoom = (props: IProperties) => {
  const loggedUser = useAppSelector((state) => state.loggedUser.user);
  const scrollbarRef = useRef(null);
  const { data } = useReceiveMessagesQuery();
  const { data: chatHistory } = useGetChatHistoryQuery({
    roomId: props.activeRoom,
  });
  const [sendMessage] = useSendMessageMutation();

  const currentRoomMessages = useMemo(() => {
    const messages = new Map<string, Message[]>([[props.activeRoom, []]]);

    if (chatHistory) {
      messages.set(props.activeRoom, [...chatHistory]);
    }

    if (data) {
      for (const [key, value] of Object.entries(data)) {
        messages.get(key)?.push(...value);
      }
    }

    const roomMessages = messages?.get(props.activeRoom);

    roomMessages?.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    return roomMessages;
  }, [data, chatHistory, props.activeRoom]);

  useEffect(() => {
    const current = scrollbarRef.current as unknown as Scrollbar;

    if (current) {
      setTimeout(() => {
        current.scrollToBottom();
      }, 50);
    }
  }, [currentRoomMessages]);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim().length > 0) {
      const message: Message = {
        sentBy: loggedUser?.id ?? "",
        userName: loggedUser?.firstName ?? "",
        text: messageText,
        createdAt: new Date().toString(),
      };

      sendMessage({ roomId: props.activeRoom, message });
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
