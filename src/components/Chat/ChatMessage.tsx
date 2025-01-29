import { User } from "@sharedTypes/globalTypes";

import {
  StyledChatMessage,
  StyledNameParagraph,
  StyledParagraph,
} from "./Chatroom.style";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
  loggedUser: User | null;
  ref?: React.MutableRefObject<HTMLDivElement> | null;
}

const ChatMessage = (props: ChatMessageProps) => {
  const isCurrentUser = props.loggedUser?.id === props.message.userId;

  return (
    <StyledChatMessage ref={props.ref} $isCurrentUser={isCurrentUser}>
      <StyledNameParagraph>{props.message.userName}</StyledNameParagraph>
      <StyledParagraph $isCurrentUser={isCurrentUser}>
        {props.message.text}
      </StyledParagraph>
    </StyledChatMessage>
  );
};

export default ChatMessage;
