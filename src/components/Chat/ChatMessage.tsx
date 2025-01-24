import { StyledChatMessage } from "./Chatroom.style";
import { Message } from "./types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <StyledChatMessage>
      <p>
        {props.message.userName}: {props.message.text}
      </p>
    </StyledChatMessage>
  );
};

export default ChatMessage;
