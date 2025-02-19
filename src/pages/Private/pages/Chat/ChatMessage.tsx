import { useEffect, useState } from "react";

import { User } from "@sharedTypes/globalTypes";
import { getTimeString } from "@utils/utils";

import {
  StyledChatMessage,
  StyledNameParagraph,
  StyledParagraph,
  StyledTime,
} from "./ChatRoom.style";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
  loggedUser: User | null;
}

let lastMessageSentBy = "";

const ChatMessage = (props: ChatMessageProps) => {
  const [displayName, setDisplayName] = useState(false);
  const isCurrentUser = props.loggedUser?.id === props.message.sentBy;

  useEffect(() => {
    if (props.message.sentBy !== lastMessageSentBy) {
      lastMessageSentBy = props.message.sentBy;
      setDisplayName(true);
    }
  }, [props]);

  const time = (
    <StyledTime $isCurrentUser={isCurrentUser}>
      {getTimeString(new Date(props.message.createdAt))}
    </StyledTime>
  );

  return (
    <StyledChatMessage
      $displayName={displayName}
      $isCurrentUser={isCurrentUser}
    >
      {displayName && (
        <StyledNameParagraph $displayName={displayName}>
          {props.message.userName}
        </StyledNameParagraph>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {isCurrentUser && time}
        <StyledParagraph $isCurrentUser={isCurrentUser}>
          {props.message.text}
        </StyledParagraph>
        {!isCurrentUser && time}
      </div>
    </StyledChatMessage>
  );
};

export default ChatMessage;
