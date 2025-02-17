import { useEffect, useState } from "react";

import { User } from "@sharedTypes/globalTypes";

import {
  StyledChatMessage,
  StyledNameParagraph,
  StyledParagraph,
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
      <StyledParagraph $isCurrentUser={isCurrentUser}>
        {props.message.text}
      </StyledParagraph>
    </StyledChatMessage>
  );
};

export default ChatMessage;
