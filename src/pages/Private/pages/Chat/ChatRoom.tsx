import { useEffect } from "react";

import { Grid } from "@mui/material";

import Scrollbar from "@components/Scrollbar/Scrollbar";
import { useAppSelector } from "@store/hooks/hooks";

import ChatMessage from "./ChatMessage";
import { StyledChatRoom } from "./ChatRoom.style";
import TypeMessageContainer from "./TypeMessageContainer";
import { useReceiveMessagesQuery, useSendMessageMutation } from "./api/chatApi";
import { Message } from "./types";

interface IProperties {
  activeRoom: string;
}

const ChatRoom = (props: IProperties) => {
  const loggedUser = useAppSelector((state) => state.loggedUser.user);

  const { data: messages } = useReceiveMessagesQuery(props.activeRoom);

  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    const container = document.getElementById("messages");

    container?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim().length > 0) {
      const message: Message = {
        userId: loggedUser?.id ?? null,
        userName: loggedUser?.firstName ?? "",
        text: messageText,
        createdAt: new Date().toDateString(),
      };

      sendMessage({ roomId: props.activeRoom, message });
    }
  };

  return (
    <StyledChatRoom>
      <Grid container display="flex" flexDirection="column" height="100%">
        <Grid item flex={1} height="70%" overflow="hidden">
          <Scrollbar>
            <div id="messages">
              {messages?.map((message: Message, index: number) => (
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
